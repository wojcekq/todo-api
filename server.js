var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

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


app.get('/', function(request, response){
    response.send('ToDo API Root');
});

app.listen(PORT, function(){
    console.log('Express listening on port ' + PORT + '!');
});