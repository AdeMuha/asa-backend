const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const router = express.Router();

// Serve lesson images from the "lesson_images" directory
const lessonImagesDirectory = path.join(__dirname, '..', 'images');
router.use('/images', express.static(lessonImagesDirectory));

// Custom middleware to handle errors for lesson images
router.use('/lesson-images/:imageName', async (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(lessonImagesDirectory, imageName);

  try {
    // Check if the image file exists
    await fs.access(imagePath);

    // If the file exists, the express.static middleware will handle the response
    res.sendFile(imagePath);
  } catch (error) {
    // If the file doesn't exist, send an error message
    res.status(404).send('Image not found');
  }
});

module.exports = router;
