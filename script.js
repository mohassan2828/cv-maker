let photoBase64 = "";

function processImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        photoBase64 = reader.result;
        document.getElementById('pdfPhoto').src = photoBase64;
        document.getElementById('pdfPhoto').style.display = 'block';
    }
    reader.readAsDataURL(event.target.files[0]);
}

function generatePDF() {
    // تعبئة البيانات يدوياً للتأكد
    const data = {
        name: document.getElementById('nameInput').value,
        job: document.getElementById('jobInput').value,
        about: document.getElementById('aboutInput').value,
        exp: document.getElementById('expInput').value,
        edu: document.getElementById('eduInput').value,
        email: document.getElementById('emailInput').value,
        phone: document.getElementById('phoneInput').value,
        addr: document.getElementById('addressInput').value
    };

    document.getElementById('pdfName').innerText = data.name || "الاسم";
    document.getElementById('pdfJob').innerText = data.job || "المسمى الوظيفي";
    document.getElementById('pdfAbout').innerText = data.about;
    document.getElementById('pdfExp').innerText = data.exp;
    document.getElementById('pdfEdu').innerText = data.edu;
    document.getElementById('pdfEmail').innerText = "Email: " + data.email;
    document.getElementById('pdfPhone').innerText = "Phone: " + data.phone;
    document.getElementById('pdfAddress').innerText = "Address: " + data.addr;

    const wrapper = document.getElementById('pdf-wrapper');
    const element = document.getElementById('cv-template');
    
    // إظهار العنصر في مكان بعيد ليتمكن المحرك من رؤية النصوص
    wrapper.style.display = 'block';

    const opt = {
        margin: 0,
        filename: 'my_cv.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
            scale: 2, 
            useCORS: true,
            backgroundColor: '#ffffff' // إجبار الخلفية البيضاء
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // إضافة تأخير (Delay) أطول قليلاً لضمان تحميل الخطوط
    setTimeout(() => {
        html2pdf().set(opt).from(element).save().then(() => {
            console.log("تم التحميل بنجاح");
        });
    }, 1000); 
}
