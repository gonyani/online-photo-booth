const uploadBtn = document.getElementById('uploadBtn');
const imageInput = document.getElementById('imageInput');

uploadBtn.addEventListener('click', () => {
  imageInput.click();
});

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (!file) {
    alert("이미지를 선택해주세요!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    localStorage.setItem("uploadedImage", e.target.result);
    window.location.href = "editor.html";
  };
  reader.readAsDataURL(file);
});
