const fs = require('fs');
const express = require('express');
const pool = require('../db');
const router = express.Router({
    caseSensitive: false
});

router.route('/tracks')
    .get( async( req,res ) => {
        try {
            const tableData = await pool.query("SELECT * FROM track");
            res.json(tableData.rows);
        } catch (error) {
            console.log(error.message);
        }
    })
    .post( async( req,res )=>{
        try {
            const {  uri, title } = req.body;
            console.log(uri, title) ;
            const newTrack = await pool.query(
                "INSERT INTO track ( title, uri ) VALUES ($1, $2) RETURNING * " ,[ title, uri]
            );
            res.json(newTrack.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    })

router.route('/tracks/:id')
    .delete( async(req, res) => {
        const {id} = req.params;
        try {
            const tableData = await pool.query("DELETE FROM track WHERE id = $1",[id]);
            res.end("OK");
        } catch (error) {
            console.log(error.message);
        }
    })

module.exports = router;