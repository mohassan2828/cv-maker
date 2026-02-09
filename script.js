function generateCV() {
  document.getElementById("cv-name").innerText =
    document.getElementById("name").value;

  document.getElementById("cv-job").innerText =
    document.getElementById("job").value;

  document.getElementById("cv-summary").innerText =
    document.getElementById("summary").value;

  const skills = document.getElementById("skills").value.split(",");
  const ul = document.getElementById("cv-skills");
  ul.innerHTML = "";

  skills.forEach(skill => {
    let li = document.createElement("li");
    li.innerText = skill.trim();
    ul.appendChild(li);
  });

  const file = document.getElementById("photo").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () =>
      document.getElementById("cv-photo").src = reader.result;
    reader.readAsDataURL(file);
  }
}

/* THEME */
function toggleTheme() {
  document.body.classList.toggle("dark");
}

/* TEMPLATE */
document.getElementById("templateSelect").addEventListener("change", function () {
  const cv = document.getElementById("cv");
  cv.className = "cv " + this.value;
});

/* PDF */
function downloadPDF() {
  html2pdf(document.getElementById("cv"), {
    margin: 0,
    filename: "CV.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { format: "a4", orientation: "portrait" }
  });
}
