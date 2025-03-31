import { OpenAI } from "openai";
import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message, theme } = req.body;

  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: "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",
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
  console.log(`Example app listening on port ${port}`)
})
