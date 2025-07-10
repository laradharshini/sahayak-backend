const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.AIzaSyDQPI0tMoFrv3VHCeeQLhAPODXd27byRcQ);

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;
  console.log("🔵 Prompt received:", prompt);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({ history: [] }); // initialize chat session

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("✅ Gemini response:", text);
    res.json({ result: text });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ result: "Error generating content." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
