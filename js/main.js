document.getElementById("goEditorBtn").addEventListener("click", () => {
    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("이미지를 먼저 업로드해주세요!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        localStorage.setItem("uploadedImage", e.target.result);
        window.location.href = "editor.html";
    };
    reader.readAsDataURL(file);
});

