export default async function handler(req, res) {
  const { message } = req.body;
  const HF_TOKEN = "hf_**************************"; // حط التوكن بتاعك هنا
  
  try {
    const response = await fetch("https://ahmadtalaat-ahmedi.hf.space/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "dolphin-llama3",
        messages: [
          { role: "system", content: "أنت Ahmad AI Pro، مساعد ذكي ومحترف." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ reply: "السيرفر لسه بيقوم يا صا.." });
  }
}
