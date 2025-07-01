// seedUsers.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    const users = [
      {
        firstName: "Latha",
        lastName: "Neeruganti",
        userName: "latha123",
        email: "latha@example.com",
        password: await bcrypt.hash("password123", 10),
        details: "Loves coding and gardening."
      },
      {
        firstName: "Raj",
        lastName: "Kumar",
        userName: "rajkumar",
        email: "raj@example.com",
        password: await bcrypt.hash("raj12345", 10),
        details: "Backend developer and foodie."
      },
      {
        firstName: "Priya",
        lastName: "Sharma",
        userName: "priyasharma",
        email: "priya@example.com",
        password: await bcrypt.hash("priya678", 10),
        details: "UI/UX designer from Pune."
      },
      {
        firstName: "John",
        lastName: "Doe",
        userName: "johnny",
        email: "john@example.com",
        password: await bcrypt.hash("john456", 10),
        details: "Full-stack developer and blogger."
      },
      {
        firstName: "Aarav",
        lastName: "Mehta",
        userName: "aaravm",
        email: "aarav@example.com",
        password: await bcrypt.hash("aarav111", 10),
        details: "Passionate about AI and robotics."
      },
      {
        firstName: "Sneha",
        lastName: "Verma",
        userName: "snehav",
        email: "sneha@example.com",
        password: await bcrypt.hash("sneha222", 10),
        details: "Digital marketer with 5+ years experience."
      },
      {
        firstName: "Vikram",
        lastName: "Patel",
        userName: "vikramp",
        email: "vikram@example.com",
        password: await bcrypt.hash("vikram333", 10),
        details: "Cloud architect at a startup."
      },
      {
        firstName: "Anjali",
        lastName: "Reddy",
        userName: "anjalir",
        email: "anjali@example.com",
        password: await bcrypt.hash("anjali444", 10),
        details: "Frontend developer from Hyderabad."
      },
      {
        firstName: "Neha",
        lastName: "Singh",
        userName: "nehas",
        email: "neha@example.com",
        password: await bcrypt.hash("neha789", 10),
        details: "Business analyst and yoga lover."
      },
      {
        firstName: "Ravi",
        lastName: "Yadav",
        userName: "raviy",
        email: "ravi@example.com",
        password: await bcrypt.hash("ravi321", 10),
        details: "Database administrator."
      },
      {
        firstName: "Meera",
        lastName: "Iyer",
        userName: "meera98",
        email: "meera@example.com",
        password: await bcrypt.hash("meera888", 10),
        details: "AI researcher and educator."
      },
      {
        firstName: "Sahil",
        lastName: "Kapoor",
        userName: "sahildev",
        email: "sahil@example.com",
        password: await bcrypt.hash("sahil123", 10),
        details: "Web developer from Mumbai."
      }
    ];

    await User.deleteMany(); // Optional: clears existing users
    await User.insertMany(users);
    console.log("✅ All 12 users added successfully");
    mongoose.disconnect();
  })
  .catch(err => console.error("❌ Error:", err));
