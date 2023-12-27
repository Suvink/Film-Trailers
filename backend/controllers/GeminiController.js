const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const geminiKey = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(geminiKey);

async function GeminiCall(req, res) {
  const { data } = req?.body;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `What do you think about ${data}?`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  if (text.length !== 0) {
    return res.status(200).json(text);
  } else {
    return res.status(400).json({ Alert: "No data retreived" });
  }
}

module.exports = { GeminiCall };
