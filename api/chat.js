import { Groq } from 'groq-sdk';

export default async function handler(req, res) {
  // استخدام المفتاح اللي إنت حاطه أصلاً في إعدادات Vercel
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const { message } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "أنت اسمك Ahmad AI Pro، مساعد ذكي ومبرمج مصري ابن بلد. اتكلم بالعامية المصرية. خليك ذكي وسريع، وهزر مع أحمد طلعت وساعده في كوده بجدعنة."
        },
        { role: "user", content: message }
      ],
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ reply: "يا نهار أبيض! السيرفر واقع يا بطل، جرب كمان شوية." });
  }
}
