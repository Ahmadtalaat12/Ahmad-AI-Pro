import Groq from "groq-sdk";

// تهيئة المكتبة باستخدام المتغير البيئي المحمي
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  const { message } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "أنت اسمك Ahmad AI Pro. مساعد ذكي ومبرمج مصري ابن بلد جدع جداً. مطورك هو الباشمبرمج أحمد طلعت. اتكلم بالعامية المصرية الشعبية، وهزر مع أحمد وساعده في كوده بجدعنة."
        },
        { role: "user", content: message }
      ],
      temperature: 0.7, // توازن بين الإبداع والدقة
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    res.status(200).json({ reply: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("حدث خطأ:", error.message);
    res.status(500).json({ reply: "يا نهار أبيض! السيرفر واقع يا بطل، جرب كمان شوية." });
  }
}
