const express = require("express");
const app = express();
const PORT = 5000;
const cors = require('cors')

// const sequelize = require("./config/db");

// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.use('/api', require('./routes/userRoutes'))
app.use('/api', require('./routes/userOrderRoutes'))
app.use('/api', require('./routes/userInventoryRoutes'))



// Start server
app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`);
});
