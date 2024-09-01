const express = require('express')
const path = require('path');

const app = express() 
const todos_file = 'data.json';
const fs =require('fs')
app.use(express.static(path.join(__dirname, 'Frontend')));
app.use(express.text())


function loadTodos() {
    try {
        return JSON.parse(fs.readFileSync(todos_file, 'utf-8'));
    } catch (error) {
        return [];
    }
}


function saveTodos(todos) {
    fs.writeFileSync(todos_file, JSON.stringify(todos, null, 2));
}

app.post('/', function (req, res) {
    const todos = loadTodos()
    let id =0;
    if(todos.length==0){
        id=0
    }
    else{
        id = todos[todos.length-1].id+1; 

    }
    const a = req.body;
    todos.push({title:a, id : id});
    saveTodos(todos);
    id++
    res.send("your hedaer is "+ a)
    

  
})
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));

})

app.get('/data',function(req,res){
    const todos = loadTodos();

    if (todos.length === 0) {
        res.send('No tasks found.');
    } 
    else {
        // const todo = []
        // for(let i =0; i<todos.length; i++){
        //     todo.push(todos[i].title)
        // }
       res.status(200).json(todos)
    }
    
})
app.delete('/', function(req, res){
    const index = req.body;
    const todos = loadTodos()
    todos.splice(index,1)
    saveTodos(todos)
    res.send("DELETED!")
})
app.put('/:a/:b', function(req, res){
    const index = req.params.a
    const text = req.params.b
    
    const todos = loadTodos()
    todos[index].title = text
    saveTodos(todos)
    res.send("CHANGED!")
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})