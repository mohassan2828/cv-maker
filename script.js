let photoData = "";

function processImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        photoData = reader.result;
        document.getElementById('pdfPhoto').src = photoData;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function generatePDF() {
    // نقل النصوص للقالب
    document.getElementById('pdfName').innerText = document.getElementById('nameInput').value || "الاسم الكامل";
    document.getElementById('pdfJob').innerText = document.getElementById('jobInput').value || "المسمى الوظيفي";
    document.getElementById('pdfAbout').innerText = document.getElementById('aboutInput').value;
    document.getElementById('pdfExp').innerText = document.getElementById('expInput').value;
    document.getElementById('pdfEdu').innerText = document.getElementById('eduInput').value;
    
    // بيانات التواصل
    document.getElementById('pdfEmail').innerText = "✉️ " + (document.getElementById('emailInput').value || "");
    document.getElementById('pdfPhone').innerText = "📞 " + (document.getElementById('phoneInput').value || "");
    document.getElementById('pdfAddress').innerText = "📍 " + (document.getElementById('addressInput').value || "");

    // المهارات
    const skillsList = document.getElementById('pdfSkills');
    skillsList.innerHTML = "";
    const skills = document.getElementById('skillsInput').value.split(',');
    skills.forEach(skill => {
        if(skill.trim()) {
            const li = document.createElement('li');
            li.innerText = skill.trim();
            skillsList.appendChild(li);
        }
    });

    const element = document.getElementById('cv-template');
    const wrapper = document.getElementById('pdf-wrapper');
    wrapper.style.display = 'block';

    const opt = {
        margin: 0,
        filename: 'My-Professional-CV.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // الانتظار ثانية لضمان رندرة النصوص
    setTimeout(() => {
        html2pdf().set(opt).from(element).save().then(() => {
            // التحميل اكتمل
        });
    }, 1000);
}
