const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json())
app.use(cors());

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]

app.get('/app/notes', (request, response) =>{
    response.json(notes);
})

app.get('/app/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(note => note.id === id);
    if (note)
    {
        response.json(note);
    } else {
        console.log("I don t found")
        response.status(404).end();
    }
    
})

app.delete('/app/delete/:id', (request, response) => {
    const id = request.params.id;
    const notesNew = notes.filter(note => note.id != id);
    console.log("New notes", notesNew);
    response.status(204).end();
})

const getId = () => {
    const MaxId = notes.length > 0
                    ? Math.max(...notes.map(n => n.id))
                    : 0
    return MaxId + 1;
}

app.post('/app/notes', (request, response) => {
    const body = request.body;

    if (!body.content) {
        return response.json({
            error: "No content provided"
        });
    }

    const newNote = {
        id: getId(),
        content: body.content,
        date: new Date(),
        important: body.important || false,
    }
    notes = notes.concat(newNote);
    response.json(newNote);
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Server created!"));

