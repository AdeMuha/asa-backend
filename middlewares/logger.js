const express = require('express');

const loggerMiddleware = (req, res, next) => {
  const startTime = new Date();
  const logEntry = {
    timestamp: startTime.toISOString(),
    method: req.method,
    url: req.url,
    query: req.query,
    body: req.body,
    headers: req.headers,
  };

  // Log the request details
  console.log('Incoming Request:', logEntry);

  // Capture the response status and calculate response time
  res.on('finish', () => {
    const endTime = new Date();
    const responseTime = endTime - startTime;

    const responseLog = {
      timestamp: endTime.toISOString(),
      status: res.statusCode,
      responseTime: `${responseTime}ms`,
    };

    // Log the response details
    console.log('Outgoing Response:', responseLog);
  });

  next();
};

module.exports = loggerMiddleware;
