// ----------------- 도트 패턴 Canvas -----------------
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');

function drawDots() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const spacing = 20; // 도트 간격
  const radius = 3;   // 도트 크기

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = '#F9C08F';
  ctx.save();
  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.rotate(Math.PI/4); // 45도 회전
  ctx.translate(-canvas.width/2, -canvas.height/2);

  for(let x = -canvas.width; x < canvas.width*2; x += spacing) {
    for(let y = -canvas.height; y < canvas.height*2; y += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI*2);
      ctx.fill();
    }
  }
  ctx.restore();
}

// 초기 실행
drawDots();

// 화면 크기 변경시 다시 그리기
window.addEventListener('resize', drawDots);

// ----------------- 업로드 버튼 기능 -----------------
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
