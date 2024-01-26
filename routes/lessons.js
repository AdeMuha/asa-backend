const express = require('express');
const client = require('../db/dbconnect.js');
const { ObjectId } = require('mongodb');
const lessonImagesMiddleware = require('./../middlewares/images.js');
const router = express.Router();


router.use('/', lessonImagesMiddleware);

// get all lessons: GET
router.get('/', async (req, res) => {
  try {
    const collection = client.db('school').collection('lessons');
    const result = await collection.find().toArray();
    res.json(result);
  } catch (err) {
    console.error('Error handling the request:', err);
    res.status(500).send('Internal Server Error');
  }
});

// add new lesson : POST
router.post('/', async (req, res) => {
  try {
    const collection = client.db('school').collection('lessons');
    const lesson = req.body;
    const result = await collection.insertOne(lesson);
    res.json(result);
  } catch (err) {
    console.error('Error handling the request:', err);
    res.status(500).send('Internal Server Error');
  }
});

// update = PUT
router.put('/:id', async (req, res) => {
  try {
    const collection = client.db('school').collection('lessons');
    const lessonId = req.params.id;
    const updatedLesson = req.body;

    const result = await collection.updateOne(
      { _id: new ObjectId(lessonId) },
      { $set: updatedLesson }
    );

    res.json(result);
  } catch (err) {
    console.error('Error handling the request:', err);
    res.status(500).send('Internal Server Error');
  }
});

// ...

// search lessons by topic and location as you type: GET
router.get('/search', async (req, res) => {
  try {
    const collection = client.db('school').collection('lessons');
    const { query } = req.query;

    // Build the search query based on the provided query parameter
    const searchQuery = {
      $or: [
        { topic: { $regex: query, $options: 'i' } }, // Case-insensitive matching for the topic
        { location: { $regex: query, $options: 'i' } }, // Case-insensitive matching for the location
      ],
    };

    const result = await collection.find(searchQuery).toArray();
    res.json(result);
  } catch (err) {
    console.error('Error handling the request:', err);
    res.status(500).send('Internal Server Error');
  }
});

// ...



module.exports = router;
