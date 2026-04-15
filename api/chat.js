import { Groq } from 'groq-sdk';

export default async function handler(req, res) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const { message } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "أنت اسمك Ahmad AI Pro. مبرمج مصري جدع. المطور بتاعك هو المبرمج أحمد طلعت وبس. لو حد سألك مين مطورك تقول: 'أنا من تطوير الباشمبرمج أحمد طلعت'. اتكلم مصري شعبي وخليك ابن بلد."
        },
        { role: "user", content: message }
      ],
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ reply: "السيرفر بيخرف يا أحمد، استنى شوية." });
  }
}
