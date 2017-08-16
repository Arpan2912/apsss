var app = require('express')();
var http = require('http').Server(app);
var io=require('socket.io')(http);
var mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/chatsocket");
var chatting=mongoose.Schema({
    msg : String
});
var Chat=mongoose.model('chat',chatting);
http.listen(3000, function(){
  console.log('listening on *:3000');
});
    
app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});
app.get('/get',function(req,res){
    Chat.find(function(err,Cursor){
        console.log(Cursor);
        res.json(Cursor);
    });
});
app.post('/',function(req,res){
   socket.emit('chat message');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect',function(){
    console.log('user is disconnected');
  });
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    var chatting=new Chat();
    chatting.msg=msg; 
    chatting.save();
    io.emit('chat message', msg);
  });
});

/*io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});*/