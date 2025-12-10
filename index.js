const express = require('express');
const app = express();

// Middleware to read JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
