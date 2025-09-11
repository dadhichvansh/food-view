import app from './src/app.js';
import connectDB from './src/db/db.js';

// Connect to the database
connectDB();

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
