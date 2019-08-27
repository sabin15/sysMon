const express = require('express'); //import package
const app = express(); 


var http = require('http').createServer(app);
var io= require('socket.io')(http);

const bodyParser = require('body-parser');

/*---------------------------------------------------------------------------------------------------------------------------------*/


//Routes
const route = require('./routes/routes.js');

//create express app

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
    var device = req.body.device;
    
    //io.sockets.emit(device,'cpu: '+ cpu + ' memory '+ memory +'\n');
    io.sockets.emit(device,req.body);
    //console.log('cpu: '+ cpu + ' memory:'+ memory +' device:'+device +'\n');
    console.log(req.body)
    res.send('cpu: '+ cpu + ' memory '+ memory+'\n');

    

});

/* ----------------------------------------------------------------------------------------------------------------------- */

io.on('connection',function(socket){
    console.log('a user connected');
    socket.on('chat message',function(msg){
        console.log('message:'+msg);
        io.emit('chat message',msg);
        
    });
    socket.on('disconnect',function(){
        console.log('user disconnected');
    });
});

http.listen(4000,() => {
    console.log("Server is listening on port 4000");
});

