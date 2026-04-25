// كود المهندس أحمد حمزاوي - نسخة التشغيل الفوري
document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.querySelector('[id*="chat"]'); // بيلقط أي ID فيه كلمة chat
    const userInput = document.querySelector('input, textarea'); // بيلقط مكان الكتابة
    const sendBtn = document.querySelector('button'); // بيلقط أول زرار في الصفحة

    async function send() {
        const msg = userInput.value.trim();
        if (!msg) return;

        // 1. عرض رسالتك
        const uDiv = document.createElement('div');
        uDiv.innerText = "أنت: " + msg;
        chatBox.appendChild(uDiv);
        userInput.value = '';

        // 2. كلمة بيفكر
        const aiDiv = document.createElement('div');
        aiDiv.innerText = "أحمدي AI بيفكر...";
        chatBox.appendChild(aiDiv);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg }) 
            });
            const data = await res.json();
            
            // 3. عرض الرد (بيجرب يقرأ كذا شكل للرد عشان ميحصلش Error)
            aiDiv.innerText = "أحمدي AI: " + (data.reply || data.choices?.[0]?.message?.content || "رد غير معروف");
        } catch (e) {
            aiDiv.innerText = "حصل مشكلة.. اتأكد من الـ API";
        }
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // ربط الزرار والـ Enter
    if (sendBtn) sendBtn.onclick = send;
    if (userInput) {
        userInput.onkeypress = (e) => { if (e.key === 'Enter') send(); };
    }
});
