const express = require('express')
const app = express()
const fs = require("fs")
const PORT = 5000;
let users;

fs.readFile("users.json","utf8",(error,data)=>{
    if(error){
        console.log("Unable to read from the file")
    }

    users = JSON.parse(data)
})

app.get('/',(req, res) => {
    res.send('Hello, welcome to my server!')
})


app.get('/users',(req, res) => {
    if(!users){
        console.log("User list is empty")
        return res.status(404).send("User list is empty")
    }
    res.status(200).send(users)
})

app.get('/users/:id',(req, res) => {
    const users_array = Object.values(users)
    const found = users_array.find(user => user.id === parseInt(req.params.id))
    if(!found){
        console.log("User not found")
        return res.status(404).send("User not found")
    }
    res.status(200).send(found)
})

app.get('/users/profession/:profession',(req, res) => {
    const users_array = Object.values(users)
    const found = users_array.find(user => user.profession === req.params.profession)
    if(!found){
        console.log("User not found")
        return res.status(404).send("User not found")
    }
    res.status(200).send(found)
})

app.get('/users/name/:name',(req, res) => {
    const users_array = Object.values(users)
    const found = users_array.find(user => user.name === req.params.name)
    if(!found){
        console.log("User not found")
        return res.status(404).send("User not found")
    }
    res.status(200).send(found)
})


app.listen(PORT, ()=>{
    console.log(`The server is running on http://localhost:${PORT}`)
});