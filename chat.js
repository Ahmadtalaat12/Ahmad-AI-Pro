const chatBox = document.getElementById('chat-box'); // المكان اللي بتظهر فيه الرسائل
const userInput = document.getElementById('user-input'); // مكان الكتابة
const sendBtn = document.getElementById('send-btn'); // زرار الإرسال

// دالة لإضافة الرسائل للشاشة
function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = role === 'user' ? 'user-msg' : 'ai-msg';
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // سكرول لتحت تلقائي
}

// دالة إرسال الرسالة
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // إظهار رسالة المستخدم
    appendMessage('user', message);
    userInput.value = '';

    try {
        // هنا بنكلم الـ Backend بتاعك أو الـ API مباشرة
        const response = await fetch('/api/chat', { // تأكد من مسار الـ API بتاعك
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        appendMessage('ai', data.reply); // 'reply' ده حسب الـ Response اللي بيرجعلك
    } catch (error) {
        appendMessage('ai', 'فيه مشكلة حصلت يا هندسة.. حاول تاني.');
        console.error('Error:', error);
    }
}

// تشغيل الإرسال عند الضغط على الزرار
sendBtn.addEventListener('click', sendMessage);

// تشغيل الإرسال عند الضغط على Enter
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
