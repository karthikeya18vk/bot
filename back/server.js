const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Register routes
app.use("/api/auth", authRoutes);

// ✅ Chat route using stable free model
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  console.log("➡️ Sending to OpenRouter:", messages);

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct", // ✅ Stable, free, accurate model
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.APP_URL || "https://frontbot-2jb6.onrender.com",
          "X-Title": "MERN ChatBot",
        },
        timeout: 20000, // 20 seconds timeout for stability
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("❌ OpenRouter Error:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error message:", error.message);
    }

    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || "Unexpected error";

    res.status(status).json({
      error: message,
      code: status,
    });
  }
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🤖 AI Chat Bot Server is Running!");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
