// Load environment variables
require('dotenv').config();

// Imports required (dependencies)
const express = require('express');
const path = require('path');
const errorHandler = require('./backend/middleware/errorHandler');
//api-doc with swagger 
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./backend/swagger/swagger-output.json');

//const swaggerFile = require('./backend/swagger/swagger')

// Import route customers
const customerRoutes = require('./backend/routes/customers');

// Create express app
const app = express();


// Middleware to parse JSON
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'frontend')));

// Basic route (homepage)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Register API routes
app.use('/customers', customerRoutes);

//swagger api-doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
// GLOBAL ERROR HANDLER
app.use(errorHandler);

// Get PORT from environment or default PORT 8080
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
