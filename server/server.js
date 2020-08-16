'USE STRICT'
const express = require('express');
const app = express();
const cors = require('cors');
const data = require('./routes/route')
const pool = require('./db');

app.use(cors())
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/',data);

const port = process.env.port || 3001;
app.listen(port, () => {
    console.log(`Server started on 3001`);
});
