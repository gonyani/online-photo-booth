window.onload = () => {
    const dataUrl = localStorage.getItem("uploadedImage");

    if (!dataUrl) {
        alert("업로드된 이미지가 없습니다. 처음으로 돌아갑니다.");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("previewImage").src = dataUrl;
};

document.getElementById("finishBtn").addEventListener("click", () => {
    // 현재는 원본 그대로 result.html로 넘김
    const dataUrl = document.getElementById("previewImage").src;

    localStorage.setItem("finalImage", dataUrl);
    window.location.href = "result.html";
});

