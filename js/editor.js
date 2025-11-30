// Canvas 도트 패턴 재사용
const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');

function drawDots() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const spacing = 20;
  const radius = 3;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#F9C08F';
  ctx.save();
  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.rotate(Math.PI/4);
  ctx.translate(-canvas.width/2, -canvas.height/2);

  for(let x = -canvas.width; x < canvas.width*2; x+=spacing){
    for(let y = -canvas.height; y < canvas.height*2; y+=spacing){
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI*2);
      ctx.fill();
    }
  }
  ctx.restore();
}

drawDots();
window.addEventListener('resize', drawDots);

// 업로드한 이미지 불러오기
const uploadedImage = document.getElementById('uploadedImage');
const imgData = localStorage.getItem('uploadedImage');
if(imgData){
  uploadedImage.src = imgData;
}

// 완료 버튼 클릭
document.querySelector('.complete-btn').addEventListener('click', ()=>{
  window.location.href = "result.html";
});
