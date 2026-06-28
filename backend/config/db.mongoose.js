const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jeevansetu';

  // Print the URI being used (hide your password before sharing the output)
  console.log("Using Mongo URI:");
  console.log(mongoURI);

  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB Connected successfully.");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:");
    console.error(err);
  }
};

module.exports = connectDB;