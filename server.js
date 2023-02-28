const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.port || 3001;

const app = express();



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));
app.get('/api/notes', (req, res) => {
    fs.promises.readFile('db/db.json')
    .then((data)=> {
        res.send(data); // return the data
    })
})

app.post('/api/notes', (req, res) =>{
    const note = req.body;
    fs.promises.readFile('db/db.json')
    .then((data)=> {
        const db = JSON.parse(data);
        db.push(note);
        return fs.promises.writeFile('db/db.json', JSON.stringify(db))
        
    })
    .then((data)=> {
        res.json(data);
    })
})
// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
