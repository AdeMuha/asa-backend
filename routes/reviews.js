const express = require('express');
const client = require('../db/dbconnect.js');
const { ObjectId } = require('mongodb');
const router = express.Router();

router.get('/:lessonId', async (req, res) => {
  const lessonId = req.params.lessonId;
  try {
    const collection = client.db('school').collection('reviews');
    const result = await collection.find({ lessonId: new ObjectId(lessonId) }).toArray();
    res.json(result);
  } catch (error) {
    console.error('Error fetching lesson reviews:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Express route for writing lessons to MongoDB
router.post('/:lessonId', async (req, res) => {
  const lessonId = req.params.lessonId;

  try {
    const collection = client.db('school').collection('reviews');
    const review = { lessonId: new ObjectId(lessonId), ...req.body };
    const result = await collection.insertOne(review);
    res.json(result);
  } catch (error) {
    console.error('Error writing lesson to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
