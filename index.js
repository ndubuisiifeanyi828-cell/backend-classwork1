import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoute from "./route/userroute.js";

dotenv.config();

const index = express();
index.use(express.json());

// Connect to Database
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to my Database ifeanyi");
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });

// Routes
index.use('/api/user', userRoute);

// Home route
index.get('/', (req, res) => {
  res.send('Hello Chinonso');
});

// Server
index.listen(5000, () => {
  console.log(`Backend is running on port 5000`);
});
