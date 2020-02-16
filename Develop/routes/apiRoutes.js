// ===============================================================================
// LOAD DATA
var express = require("express");
const fs = require("fs");
const dbj = require("../db/db.json");

console.log(dbj[0].title + ' ' + dbj[0].text);

const { promisify } = require('util')

var obj;

const readFileAsync = promisify(fs.readFile)

readFileAsync(`${__dirname}/../db/db.json`, { encoding: 'utf8' })
    .then(contents => {
        const obj = JSON.parse(contents)
        console.log(obj)
    })
    .catch(error => {
        throw error
    })

// fs.readFile("../db/db.json", function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     res.end();
//   });

// var obj = JSON.parse(fs.readFileSync("../db/db.json", 'utf8'));

// console.log(obj[0].title + " from fs system");
// C:\Users\rbeat\Developer\uofu\sandbox\11-NoteTaker\Develop\db\db.json
// db\db.json
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests



    app.get("/api/notes", function (req, res) {
        const readFileAsync = promisify(fs.readFile)

        readFileAsync(`${__dirname}/../db/db.json`, { encoding: 'utf8' })
            .then(contents => {
                const obj = JSON.parse(contents)
                console.log(obj)
            })
            .catch(error => {
                throw error
            })

        res.json(obj);
    });



    // API POST Requestsno

    var UniqueId = 1;

    app.post("/api/notes", function (req, res) {

        // turn the obj to a a string
        // var jsonString = JSON.stringify(req.body);

        // add a unique ID with a comma
        // jsonString += ", " + UniqueId++;

        // parse it back to a json file
        // req.body = JSON.parse(jsonString);

        //  push it to the db.json file
        // dbj.push(req.body.push(UniqueId++));
        // dbj.push(jsonString);


        fs.appendFile("../db/db.json", ", " + req.body + "'id':" + UniqueId++, function (err) {
            if (err) throw err;
            console.log('Updated!');
        });
        res.json(true);
    });


    //  DELETE `/api/notes/:id` - Should recieve a query paramter containing the id of a note to delete. 
    // This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete 
    // a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` 
    // property, and then rewrite the notes to the `db.json` file.

    app.post("/api/notes/:id", function (req, res) {


        // get tempprary notes
        var notesArr = obj;

        var foundId = req.params.id;

        for (var i in notesArr) {
            //          if the Id's match
            if (foundId.compare(i.id) === 0) {
                // cut the array up to the item to be deleted
                var beginArr = notesArr.splice(0, i);
                // slice the back half of whatever is remaining
                var endArr = notes.Arr.splice(i + 1, notesArr.length - 1);
                // concat the two without the element with the foundID
                notesArr = beginArr.concat(endArr);
                obj.replace(notesArr);
                res.json(true);
            }
            else {
                // id not found
                res.json(false);
            }
            console.log(obj);

        }
    });
};
