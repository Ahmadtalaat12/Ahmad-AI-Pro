// كود واجهة "أحمدي AI Pro" - نسخة المهندس أحمد حمزاوي
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

let chatHistory = []; // ذاكرة الجلسة

// دالة إضافة الرسائل بتنسيق شيك
function appendMessage(role, text, isThinking = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = role === 'user' ? 'user-msg' : 'ai-msg';
    
    if (isThinking) {
        msgDiv.id = 'thinking-temp'; // علامة عشان نمسحه لما الرد يجهز
        msgDiv.innerText = 'أحمدي AI بيفكر...';
    } else {
        msgDiv.innerText = text;
    }
    
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return msgDiv;
}

// دالة الإرسال الأساسية
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // إظهار رسالة المستخدم وتصفير الإدخال
    appendMessage('user', message);
    userInput.value = '';

    // إضافة رسالة "بيفكر"
    const thinkingMsg = appendMessage('ai', '', true);

    // تحديث الذاكرة (آخر 4 رسايل لضمان العمق والسرعة)
    chatHistory.push({ role: "user", content: message });
    const optimizedContext = chatHistory.slice(-4);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                messages: [
                    { role: "system", content: "أنت مساعد محترف ومبدع. مطورك هو المهندس أحمد حمزاوي. أجب بتعمق وتفصيل تقني." },
                    ...optimizedContext
                ]
            })
        });

        const data = await response.json();
        
        // حذف كلمة "بيفكر" وإضافة الرد الحقيقي
        thinkingMsg.remove();

        if (data.reply || (data.choices && data.choices[0].message)) {
            const aiReply = data.reply || data.choices[0].message.content;
            appendMessage('ai', aiReply);
            chatHistory.push({ role: "assistant", content: aiReply });
        } else {
            throw new Error('Response Error');
        }

    } catch (error) {
        if (document.getElementById('thinking-temp')) {
            document.getElementById('thinking-temp').remove();
        }
        appendMessage('ai', 'فيه مشكلة في الربط يا هندسة.. جرب تاني.');
        console.error('Error:', error);
    }
}

// تشغيل الإرسال (زرار أو Enter)
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
