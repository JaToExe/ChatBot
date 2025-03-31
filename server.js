import { OpenAI } from "openai";
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

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
