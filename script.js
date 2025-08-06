document.addEventListener('DOMContentLoaded', function() {
    // 1. وظيفة إرسال الطلب عبر واتساب مع التحقق من الحقول والأمان
    const orderForm = document.querySelector('.order-form form');

    // دالة لتنظيف المدخلات من أي أكواد ضارة
    function sanitizeInput(input) {
        // إنشاء عنصر وهمي لإزالة أي أكواد HTML
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    orderForm.addEventListener('submit', function(event) {
        event.preventDefault(); // منع إرسال النموذج بالطريقة التقليدية

        // الحصول على قيم الحقول وتعديلها (إزالة المسافات الزائدة)
        const customerName = document.getElementById('customerName').value.trim();
        const phone1 = document.getElementById('phone1').value.trim();
        const address = document.getElementById('address').value.trim();
        const sheinLink = document.getElementById('sheinLink').value.trim();
        const phone2 = document.getElementById('phone2').value.trim(); // حقل اختياري

        // التحقق من الحقول الإلزامية
        if (!customerName || !phone1 || !address || !sheinLink) {
            alert('الرجاء إدخال جميع الحقول المطلوبة (الاسم، رقم الهاتف الأول، العنوان، ورابط السلة).');
            return; // إيقاف تنفيذ الوظيفة
        }

        // التحقق من أن الرابط هو من موقع شي إن فقط
        const sheinDomainRegex = /shein\.com/i;
        if (!sheinDomainRegex.test(sheinLink)) {
            alert('الرجاء إدخال رابط صحيح من موقع شي إن فقط.');
            return; // إيقاف تنفيذ الوظيفة
        }

        // تنظيف المدخلات لمنع أي هجمات
        const sanitizedName = sanitizeInput(customerName);
        const sanitizedPhone1 = sanitizeInput(phone1);
        const sanitizedAddress = sanitizeInput(address);
        const sanitizedSheinLink = sanitizeInput(sheinLink);
        const sanitizedPhone2 = sanitizeInput(phone2);

        // إعداد رسالة الواتساب باستخدام المدخلات النظيفة
        const message = `
        *طلب جديد من موقعك* 🎉

        *الاسم:* ${sanitizedName}
        *رقم الهاتف 1:* ${sanitizedPhone1}
        *رقم الهاتف 2:* ${sanitizedPhone2 || 'لا يوجد'}
        *العنوان:* ${sanitizedAddress}
        *رابط سلة شي إن:* ${sanitizedSheinLink}

        
        `;

        const whatsappNumber = '218946350121';
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');
    });
});