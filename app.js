const express = require('express'); //import package
const bodyParser = require('body-parser');

//Routes
const route = require('./routes/routes.js');

//create express app
const app = express(); 
app.set('view engine','ejs');

//parse requests of content-type -application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//parse requests of content-type - application/json
app.use(bodyParser.json());

app.use('/monitor',route);




//MIDDLEWARES


app.use('/posts',() => {
    console.log('This is a middleware log.');


});


//ROUTES
app.get('/',(req,res) =>{
    //res.send("we are on home");
    res.json({"message": "Welcome to EasyNotes application"});


});

app.post('/post',(req,res) =>{
    var cpu = req.body.cpu;
    var memory = req.body.memory;
    console.log('cpu: '+ cpu + ' memory'+ memory +'\n');
    res.send('cpu: '+ cpu + ' memory'+ memory+'\n');
    

});
app.listen(3000,() => {
    console.log("Server is listening on port 3000");
});

