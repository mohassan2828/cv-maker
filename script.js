let photoData = "";

function processImage(event) {
    const reader = new FileReader();
    reader.onload = () => {
        photoData = reader.result;
        document.getElementById('pdfPhoto').src = photoData;
    };
    reader.readAsDataURL(event.target.files[0]);
}

function generatePDF() {
    // ملء البيانات
    document.getElementById('pdfName').innerText = document.getElementById('nameInput').value || "اسمك الكامل";
    document.getElementById('pdfJob').innerText = (document.getElementById('jobInput').value).toUpperCase() || "المسمى الوظيفي";
    document.getElementById('pdfEmail').innerText = document.getElementById('emailInput').value;
    document.getElementById('pdfPhone').innerText = document.getElementById('phoneInput').value;
    document.getElementById('pdfAddress').innerText = document.getElementById('addressInput').value;
    document.getElementById('pdfAbout').innerText = document.getElementById('aboutInput').value;
    document.getElementById('pdfExp').innerText = document.getElementById('expInput').value;
    document.getElementById('pdfEdu').innerText = document.getElementById('eduInput').value;

    const skillsContainer = document.getElementById('pdfSkills');
    skillsContainer.innerHTML = "";
    const skills = document.getElementById('skillsInput').value.split(',');
    skills.forEach(s => {
        if(s.trim()) skillsContainer.innerHTML += `<span>${s.trim()}</span>`;
    });

    // تحميل الـ PDF
    const element = document.getElementById('cv-template');
    const wrapper = document.getElementById('pdf-wrapper');
    wrapper.style.display = 'block';

    const opt = {
        margin: 0,
        filename: 'Canva_Style_CV.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 4, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    setTimeout(() => {
        html2pdf().set(opt).from(element).save().then(() => {
            // wrapper.style.display = 'none'; 
        });
    }, 1000);
}
