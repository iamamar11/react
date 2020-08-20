const fs = require('fs');
const express = require('express');
const getData = require('./functions');
const pool = require('../db');
const router = express.Router({
    caseSensitive: false
});

// 
router.route('/playlist')
    .get( async( req,res ) => {
        try {
            const response = await getData("playlist");
            res.json(response.rows);
        } catch (error) {
            console.log(error.message);
        }
    })

// http://localhost/tracks  method is GET
router.route('/tracks')
    .get( async( req,res ) => {
        try {
            const response = await getData("track");
            res.json(response.rows);
        } catch (error) {
            console.log(error.message);
        }
    })
    .post( async( req,res )=>{
        try {
            const {  uri, title, playlist_id } = req.body;
            //* fetching Data from the track table to see if data already exist
            const response = await getData("track");
            
            //* Getting playlist Number from Playlist Table
            const getplaylistId = await pool.query(
                "SELECT id from playlist WHERE title = ($1)",[playlist_id]
            );
            
            //* checking for the duplicate data
            const result = (response.rows).filter(data => {
                return (getplaylistId.rows[0].id == data.playlist_id && data.title == title)
            })
            console.log(result);

            if(result.length != 0){
                res.status(409).json(`${title} already exists in ${playlist_id}`);
            } else{
                const newTrack = await pool.query(
                    "INSERT INTO track ( playlist_id ,title, uri ) VALUES ($1, $2, $3) RETURNING * " ,[getplaylistId.rows[0].id, title, uri]
                );
                res.json(newTrack.rows[0]);
            }
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