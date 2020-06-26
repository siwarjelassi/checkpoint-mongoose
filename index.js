var express = require('express');
var mongoose = require('mongoose');

const port = 5000;
const app = express();
var Person= require('./models/person');
const person = require('./models/person');
app.use(express.json())

mongoose.connect("mongodb://localhost/mongotest", { useUnifiedTopology: true, useNewUrlParser: true  },
(err)=>{
  if (err) { throw err; }})

    //Create and Save a model:


app.post('/addPerson', async(req, res)=>{
 let newPerson= req.body
 try{
  const addResult= await newPerson.save()
  res.status(200).json("contact added"+ addResult);
 }
 
 catch (error) {
  res.status(500).json({ errors: error });
}})
;



 //Create and Save many persons:


app.post('/addPersonArray', (req, res,err)=>{
  var arrayOfPeople = [
    { name: "siwar", age: 25, favoriteFoods: ["meat"] },
    { name: "eya", age: 29, favoriteFoods: ["apple"] },
    { name: "mahdi", age: 23, favoriteFoods: ["cake"] }
  ];

  Person.create(arrayOfPeople,(err, data) => {
    if(data){
      res.send(data)
        }else{
          res.send()
        }
  }) 
})

//Search person by using model.find():
app.get('/findPerson', (req, res)=>{

  
    Person.findOne({favoriteFoods: "apple"}, (err, data)=> {
     res.send(data)
      if(err) return done(err);
      return (null, data)
   } )})


//Search person by Id:
app.get('/findPerson/:id', (req, res)=>{
  Person.findById(req.params.id)
  .then(doc=>{
    if(!doc) {return res.status(404).end();}
    return res.status(200).json(doc);
  })
  .catch(err=> next(err));
})

 // Perform New Updates on a Document Using model.findOneAndUpdate()
 app.put("/update/:_id"), async(req, res)=>{
   const {_id} = req.params ;
   try {
     const updateRes = await Person.findOneAndUpdate(
       {_id},
       { $set: req.body}
     );
     res.send("favorite foods modified");
   } catch (error) {
     res.status(500).json({errors: error});
   }
};
//Delete One Document Using model.findByIdAndRemove
app.delete('delete/:id', (req, res )=>{

  var id = req.params.id;
Person.findOneAndRemove({_id: id}, (err, data)=>{
  if(data){
    res.send(data)
      }else{
        res.send('error')
        }
});
});

//MongoDB and Mongoose - Delete Many Documents with model.remove()

app.delete('/deleteMany', (req, res)=>{
const removeManyPeople = (done)=> {
  var nameToRemove = "siwar";
  Person.deleteMany(
  {name: nameToRemove},
  (err, data) => {
  if (err) {done(err);}
  done(null, data);
  })  
}})

//  Chain Search Query Helpers to Narrow Search Results

app.get('/getPerson', (req,res,err)=>{
  console.log('getting all person')
  Person.find({})
  .exec(err,Person)
    if(err){
      res.send('error has occured ');
    }else {
      console.log(persons);
      res.json(persons);
    
  }
})


app.listen(port, function () {
  console.log("Server is running on "+ port +" port")
})
