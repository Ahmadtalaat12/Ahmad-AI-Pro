async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const messageContainer = document.getElementById('chat-container');
    const userMessage = inputField.value.trim();

    if (userMessage === "") return;

    // عرض رسالة المستخدم
    displayMessage('أنت', userMessage);
    inputField.value = '';

    try {
        // هنا بنبعت لـ Vercel أو الـ API اللي إنت مثبته
        const response = await fetch('/api/chat', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: userMessage })
        });

        const data = await response.json();
        
        if (data.reply) {
            displayMessage('مساعد أحمد', data.reply);
        } else {
            displayMessage('مساعد أحمد', "وصلت استجابة فارغة من الخادم.");
        }
    } catch (error) {
        console.error("خطأ:", error);
        displayMessage('مساعد أحمد', "حدث خطأ أثناء محاولة الاتصال.");
    }
}

function displayMessage(sender, text) {
    const container = document.getElementById('chat-container');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message ' + (sender === 'أنت' ? 'user' : 'ai');
    msgDiv.innerText = text;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

