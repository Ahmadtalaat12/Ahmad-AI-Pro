// كود "أحمدي AI" - النسخة الصافية
const chatBox = document.getElementById('chat-box') || document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn') || document.querySelector('button');

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // إظهار رسالة المستخدم
    const userDiv = document.createElement('div');
    userDiv.className = 'user-msg';
    userDiv.innerText = message;
    chatBox.appendChild(userDiv);
    
    userInput.value = '';

    // إظهار "بيفكر..."
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'ai-msg';
    thinkingDiv.innerText = 'جاري التفكير...';
    chatBox.appendChild(thinkingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message }) 
        });

        const data = await response.json();
        
        // مسح "بيفكر" ووضع الرد
        thinkingDiv.innerText = data.reply || data.choices[0].message.content;

    } catch (error) {
        thinkingDiv.innerText = 'فيه مشكلة في الـ API يا هندسة..';
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}

// تشغيل الزرار
if(sendBtn) {
    sendBtn.onclick = sendMessage;
}

// تشغيل الـ Enter
userInput.onkeypress = (e) => {
    if (e.key === 'Enter') sendMessage();
};
