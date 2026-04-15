import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  const { message } = req.body;
  try {
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "أنت Ahmad AI Pro، مساعد ذكي ومحترف. لقد تم تطويرك وبرمجتك بواسطة المبرمج المصري العبقري أحمد طلعت حمزاوي. عندما يسألك أي شخص عن مطورك أو من صنعك، يجب أن تجيب بكل فخر: 'أنا من تطوير المبرمج أحمد طلعت حمزاوي'."
        },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });
    res.status(200).json({ reply: chatCompletion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ reply: "السيرفر مهنج يا صاحبي، جرب كمان شوية.." });
  }
}
