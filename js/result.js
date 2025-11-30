window.onload = () => {
    const finalImg = localStorage.getItem("finalImage");

    if (!finalImg) {
        alert("완성된 이미지가 없습니다. 처음으로 돌아갑니다.");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("finalImage").src = finalImg;
};

document.getElementById("downloadBtn").addEventListener("click", () => {
    const url = document.getElementById("finalImage").src;

    const link = document.createElement("a");
    link.href = url;
    link.download = "sticker_photo.png";
    link.click();
});

