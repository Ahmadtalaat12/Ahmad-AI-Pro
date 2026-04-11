document.addEventListener('DOMContentLoaded', () => {
    // تعريف الزر وحقل الإدخال
    const sendBtn = document.querySelector('button'); 
    const userInput = document.querySelector('input');

    if (sendBtn) {
        sendBtn.onclick = () => {
            const text = userInput.value;
            if (text.trim() !== "") {
                alert("تم استلام رسالتك: " + text);
                userInput.value = ""; 
            } else {
                alert("يرجى كتابة نص أولاً");
            }
        };
        console.log("تم تفعيل زر الإرسال بنجاح");
    }
});
