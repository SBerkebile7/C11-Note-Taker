const fs = require('fs');
const router = require('express').Router();

// get function for notes saved in db
router.get('/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if(err) throw err;

        let notes = JSON.parse(data);

        res.json(notes);
    });
});

// post function for notes saved on page into the db
router.post('/notes' , (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if(err) throw err;

        let notes = JSON.parse(data);

        let newNote = req.body;
        let noteId = (notes.length).toString();
        newNote.id = noteId;
        
        notes.push(newNote);

        fs.writeFileSync('db/db.json', JSON.stringify(notes), 'utf8', (err, data) => {
            if(err) throw err;
            console.log('New note added successfully');
        })
        res.json(notes);
    });
});

// possible delete function for extra credit
router.delete('/notes/:id' , (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if(err) throw err;

        let notes = JSON.parse(data);
        let noteId = req.params.id;
        let newId = 0;

        notes = notes.filter(currentNote => {
            return currentNote.id != noteId;
        })

        for(currentNote of notes) {
            currentNote.id = newId.toString();
            newId++;
        }

        fs.writeFileSync('db/db.json', JSON.stringify(notes), 'utf8', (err, data) => {
            if(err) throw err;
            console.log('Note deleted successfully');
        })

        res.json(notes);
    });
});

module.exports = router;