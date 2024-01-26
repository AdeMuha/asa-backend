const express = require('express');
const client = require('../db/dbconnect.js');
const ObjectId = require('mongodb');
const router = express.Router();


// get all lessons: GET
router.get('/', async (req, res) => {
  try {
    const collection = client.db('school').collection('orders');
    const result = await collection.find().toArray();
    res.json(result);
  } catch (err) {
    console.error('Error handling the request:', err);
    res.status(500).send('Internal Server Error');
  }
});

// add new lesson : POST Route
router.post('/', async (req, res) => {
  try {
    const collection = client.db('school').collection('orders');//Assessing from the database.
    const lesson = req.body;
    const result = await collection.insertOne(lesson);
    res.json(result);
  } catch (err) {
    console.error('Error handling the request:', err);
    res.status(500).send('Internal Server Error');
  }
});

// PUT Route
router.put('/:id', async (req, res) => {
  try {
    const collection = client.db('school').collection('lessons');
    const lessonId = req.params.id;
    const updatedLesson = req.body;

    const result = await collection.updateOne(
      { _id: ObjectId(lessonId) },
      { $set: updatedLesson }
    );

    res.json(result);
  } catch (err) {
    console.error('Error handling the request:', err);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
