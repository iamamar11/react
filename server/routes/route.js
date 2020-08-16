const fs = require('fs');
const express = require('express');
const pool = require('../db');
const router = express.Router({
    caseSensitive: false
});
// 
router.route('/playlist')
    .get( async( req,res ) => {
        try {
            const tableData = await pool.query("SELECT title, id FROM playlist");
            res.json(tableData.rows);
        } catch (error) {
            console.log(error.message);
        }
    })

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
            const {  uri, title, playlist_id } = req.body;
            console.log(playlist_id);
            const getplaylistId = await pool.query(
                "SELECT id from playlist WHERE title = ($1)",[playlist_id]
            );
            console.log(getplaylistId.rows[0].id);
            console.log(uri, title) ;
            const newTrack = await pool.query(
                "INSERT INTO track ( playlist_id ,title, uri ) VALUES ($1, $2, $3) RETURNING * " ,[getplaylistId.rows[0].id, title, uri]
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