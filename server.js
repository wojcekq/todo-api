var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todo = [];
var todoNextId = 1;

app.use(bodyParser.json());

var todos = [{
    id: 1,
    description: "Pick up car from the shop",
    completed: false
}, {
    id: 2,
    description: "Go to market",
    completed: false
}, {
    id: 3,
    description: "Go on a walk",
    completed: true
}];

app.get('/', function(request, response){
    response.send('ToDo API Root');
});

//REQUESTS
//GET /todos - fetch all
app.get('/todos', function(request,response){
   response.json(todos); 
});
//GET /todos/:id - fetch single todo
app.get('/todos/:id', function(request,response){
    var todoId = parseInt(request.params.id, 10);
    
    var matchedTodo;
    
    todos.forEach(function(item){
        if(todoId === item.id){
            matchedTodo = item;
        }
    });
    
    if(matchedTodo){
        response.json(matchedTodo)
    } else {
        response.status(404).send();    
    }
});

//POST
app.post('/todos', function(request,response){
    var body = request.body;
    
    body.id = todoNextId++;
    todos.push(body);
    
    response.json(body);
});


app.listen(PORT, function(){
    console.log('Express listening on port ' + PORT + '!');
});


