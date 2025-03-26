import dotenv from "dotenv";
import fs from "fs";
import Groq from 'groq-sdk';

dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
if(!GROQ_API_KEY) {
    console.error("Missing Google API Key!");
    process.exit(1);
}

export const llamaVision = async (filePath) => {
  const groq = new Groq({apiKey: GROQ_API_KEY});
  const image = fs.readFileSync(filePath).toString("base64");
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "Describe the following image."
          },
          {
            "type": "image_url",
            "image_url": {
              "url": `data:image/png;base64,${image}`
            }
          }
        ]
      }
    ],
    "model": "llama-3.2-11b-vision-preview",
    "temperature": 1,
    "max_completion_tokens": 1024,
    "top_p": 1,
    "stream": false,
    "stop": null
  });

  return chatCompletion.choices[0].message.content;
} 