import { Groq } from 'groq-sdk';
export default async function handler(req, res) {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    try {
        const { message } = req.body;
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: message }],
        });
        res.status(200).json({ reply: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ reply: "API Error" });
    }
}
