// كود أحمد برو المعدل - بيبعت آخر 4 رسايل بس
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
let history = []; 

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage('user', message);
    userInput.value = '';

    history.push({ role: "user", content: message });

    // السطر السحري: بياخد آخر 4 رسايل بس من الذاكرة
    const optimizedHistory = history.slice(-4);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [
                    { role: "system", content: "أنت أحمدي، مساعد ذكي ومحترف." },
                    ...optimizedHistory
                ]
            })
        });

        const data = await response.json();
        const botReply = data.choices[0].message.content;

        appendMessage('assistant', botReply);
        history.push({ role: "assistant", content: botReply });

    } catch (error) {
        console.error('Error:', error);
        appendMessage('assistant', 'حصل خطأ، جرب تاني يا أحمد.');
    }
}

function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = role === 'user' ? 'user-msg' : 'bot-msg';
    msgDiv.innerText = text;
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
