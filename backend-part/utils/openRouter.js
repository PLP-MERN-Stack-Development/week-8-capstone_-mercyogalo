import axios from "axios";

export async function generateOpenRouterResponse(query){
    const apiKey = process.env.OPENROUTER_API_KEY
    try {
         const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model:  "mistralai/mistral-7b-instruct", // You can change to other models below
        messages: [
            { role: "system", content: "Please respond concisely. Keep answers short and clear." },
            { role: "system", content: "You are Nyla, a friendly and knowledgeable AI assistant who specializes only in women's vaginal health. Only respond to questions about vaginal hygiene, periods, discharge, fertility, infections, and related concerns. If a question is unrelated, kindly inform the user that you can only assist with vaginal health topics."},
            { role: "user", content: query }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://ai-project-1-9gvt.onrender.com/", // Or your frontend domain
          "X-Title": "Women's Health Assistant"
        }
      }
    );

    return response.data.choices[0].message.content;
    } catch (error) {
   console.error("OpenRouter Error:", {
  message: error.message,
  status: error.response?.status,
  data: error.response?.data,
});
    throw new Error("Failed to get AI response.");
    }
}