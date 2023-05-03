const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// dbUser1
//BX6l6tQy8uBj035F

const uri = "mongodb+srv://dbUser1:BX6l6tQy8uBj035F@cluster0.f1qaqyz.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
            try{
                const userCollection = client.db('nodeMongoCrud').collection('users');
                
                app.get('/users',async(req,res)=>{
                       const query = {};
                       const cursor = userCollection.find(query);
                       const  users = await cursor.toArray();
                       res.send(users);
                       
                })
                app.get('/users/:id',async(req,res)=>{
                      const id = req.params.id;
                      const query = {_id: new ObjectId(id)};
                      const user = await userCollection.findOne(query);
                      res.send(user);
                })

                app.post('/users',async(req,res) =>{
                        const user = req.body;
                        console.log(user);
                        const result = await userCollection.insertOne(user)
                        res.send(result);
                })
                app.put('/users/:id',async(req,res) => {
                        const id = req.params.id;
                        const filter = {_id: new ObjectId(id)};
                        const user = req.body;
                        const options = {upsert : true};
                        const updatedUser = {
                              $set: {
                                name : user.name,
                                address: user.address,
                                email : user.email
                              },
                        };
                        const result = await userCollection.updateOne(filter,updatedUser,options);
                        res.send(result);
                })
                app.delete('/users/:id',async(req,res)=>{
                       const id = req.params.id;
                       const query = { _id: new ObjectId(id) };
                      const result = await userCollection.deleteOne(query);
                      console.log(result);
                      res.send(result);

                })

              
              }
        finally{
           
        } 
  }
run().catch(err => console.log(err));


app.get('/',(req,res)=>{
    res.send('node mongo crud server is running');
});

app.listen(port,(req,res)=>{
      console.log(`listening the port ${port}`);
});