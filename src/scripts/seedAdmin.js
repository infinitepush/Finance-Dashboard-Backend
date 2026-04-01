require("dotenv").config();

const connectDB = require("../config/db");
const User = require("../models/User");

(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);

    const email = "admin@example.com";
    const existing = await User.findOne({ email });

    if (existing) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    await User.create({
      name: "System Admin",
      email,
      password: "admin123",
      role: "admin",
      status: "active",
    });

    console.log("Admin user created: admin@example.com / admin123");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
