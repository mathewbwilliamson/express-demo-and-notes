'use strict'

require('dotenv').config({ path: '.env'})
const express = require('express') // [matt] Memo require()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

const { PORT, CLIENT_ORIGIN } = require('./config');

const { dbConnect } = require('./db/db-mongoose');

const Lead = require('./models/leads');

const app = express()

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Basic GET using a fetch
app.get('/', (req, res, next) => {
    const query = req.query

    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(data => {
            console.log('[matt][tealium] data', data)
            console.log('[matt][tealium] query', query)
            res.send(data)
        })
})

// More advanced GET ALL with a database
app.get('/api/leads', (req, res, next) => {
    const { searchTerm } = req.query;
    let filter = { };

    if (searchTerm && typeof(searchTerm) === 'string') {
        const re = new RegExp(searchTerm, 'i');
        filter.$or = [
        { 'firstName': re }, 
        { 'lastName': re },
        { 'emailAddress': re },
        ];
    }

    Lead.find(filter)
        .sort({ updatedAt: 'desc' })
        .then(results => {
            res.json(results);
        })
        .catch(err => {
        next(err);
        });
})

/* ========== GET/READ A SINGLE ITEM ========== */
app.get('/api/leads/:id', (req, res, next) => {
    const { id } = req.params;
  
    Lead.findOne({_id: id})
      .then(result => {
        if (result) {
          res.json(result);
        } else {
          next();
        }
      })
      .catch(err => {
        next(err);
      });
  });
  

function runServer(port = PORT) {
    const server = app
        .listen(port, () => {
            console.info(`App listening on port ${server.address().port}`);
        })
        .on('error', err => {
            console.error('Express failed to start');
            console.error(err);
        });
}
    
if (require.main === module) {
    dbConnect();
    runServer();
}

module.exports = { app };
    