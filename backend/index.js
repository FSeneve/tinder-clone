const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const {v4: uuidv4} = require("uuid");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.json("Hello World!");
});

app.post("/signup", async (req, res)=>{
    const client = new MongoClient(process.env.DB_URI);
    const {email, password } = req.body;

    const generatedUserId = uuidv4();
    const hashedPassword = await bcrypt.hash(password,10);

    try {
        await client.connect();
        const database = client.db("tinder-clone");
        const users = database.collection('users');
        const existingUser = await users.findOne({email});
        if(existingUser) {
            return res.status(409).json({message: "Email already in use!"});
        }

        const sanitiziedEmail = email.toLowerCase();

        const data = {
            user_id: generatedUserId,
            email: sanitiziedEmail, 
            hashed_password: hashedPassword
        }

        const newUser = await users.insertOne(data);
        const token = jwt.sign(newUser, sanitiziedEmail, {
            expiresIn: 60*24
        });

        res.status(201).json({token, 
            user_id: generatedUserId,
            email: sanitiziedEmail
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }

});

app.get("/users", async(req, res)=>{
    const client = new MongoClient(process.env.DB_URI);
    try {
        await client.connect();
        const database = client.db('tinder-clone');
        const users = database.collection('users');
        const allUsers = await users.find({}).toArray();
        res.json(allUsers);
    } catch (error) {
        res.status(404).json({error: error.message});
    } finally{
        await client.close();
    }
})


app.listen(PORT, ()=>console.log(`Server is up and running on port: ${PORT}`));