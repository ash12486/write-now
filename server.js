
//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

// Setting Up Server
const app = express();
const PORT = process.env.PORT || 3000;

// Asynchronous Processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//Middleware
app.use(express.static("./Develop/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Route | "Get" request
app.get("/api/notes", function(req, res) {
    readFileAsync("./Develop/db/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    }).catch(function(err) {
        console.log(err);
        res.status(500).end();
    })
});

// API Route | "POST" request
app.post("/api/notes", function(req, res) {
    const note = req.body;
    readFileAsync("./Develop/db/db.json", "utf8").then(function(data) {
        const notes = JSON.parse(data);
        note.id = notes.length + 1;
        notes.push(note);
        return notes;
    }).then(function(notes) {
        writeFileAsync("./Develop/db/db.json", JSON.stringify(notes)).then(function() {
            res.json(note);
        }).catch(function(err) {
            console.log(err);
            res.status(500).end();
        });
    }).catch(function(err) {
        console.log(err);
        res.status(500).end();
    });
});

// API Route | "DELETE" request
app.delete("/api/notes/:id", function(req, res) {
    const idToDelete = parseInt(req.params.id);
    readFileAsync("./Develop/db/db.json", "utf8").then(function(data) {
        const notes = JSON.parse(data);
        const newNotesData = [];
        for (let i = 0; i < notes.length; i++) {
            if(idToDelete !== notes[i].id) {
                newNotesData.push(notes[i]);
            }
        }
        return newNotesData;
    }).then(function(notes) {
        writeFileAsync("./Develop/db/db.json", JSON.stringify(notes)).then(function() {
            res.send('deleted successfully!');
        }).catch(function(err) {
            console.log(err);
            res.status(500).end();
        });
    }).catch(function(err) {
        console.log(err);
        res.status(500).end();
    });
});

//HTML Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});


// Listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});