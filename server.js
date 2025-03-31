import OpenAI from "openai";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3003;

const apiToken = process.env.AI_API_KEY

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message, theme } = req.body;

  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: apiToken
  });

  try {
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: theme },
        { role: "user", content: message }
      ],
      model: "gpt-4o",
      temperature: 1,
      max_tokens: 4096,
      top_p: 1
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    res.status(500).json({ reply: "Wystąpił błąd podczas komunikacji z OpenAI." });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});