// كود الذكاء الاصطناعي - نسخة المهندس أحمد حمزاوي
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
let history = []; 

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage('user', message);
    userInput.value = '';

    history.push({ role: "user", content: message });

    // الذاكرة المحدودة لضمان السرعة وعدم حدوث Error
    const optimizedHistory = history.slice(-4);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [
                    { 
                        role: "system", 
                        content: "أنت مساعد ذكي ومحترف. مبرمجك ومطورك هو المهندس أحمد حمزاوي. إذا سألك أحد من برمجك أو من المطور، يجب أن تجيب بوضوح: المبرمج هو المهندس أحمد حمزاوي." 
                    },
                    ...optimizedHistory
                ]
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            const botReply = data.choices[0].message.content;
            appendMessage('assistant', botReply);
            history.push({ role: "assistant", content: botReply });
        } else {
            throw new Error('Format Error');
        }

    } catch (error) {
        console.error('Error:', error);
        appendMessage('assistant', 'حصل خطأ، جرب تاني يا هندسة.');
    }
}

function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = role === 'user' ? 'user-msg' : 'bot-msg';
    msgDiv.innerText = text;
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
