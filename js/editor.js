// ----------------- Canvas 도트 패턴 -----------------
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

// ----------------- 업로드 이미지 -----------------
const uploadedImage = document.getElementById('uploadedImage');
const imgData = localStorage.getItem('uploadedImage');
if(imgData){
  uploadedImage.src = imgData;
}

// ----------------- 스티커 기능 -----------------
const stickerBtn = document.getElementById('stickerBtn');
const stickerPanel = document.getElementById('stickerPanel');
const photoFrame = document.getElementById('photoFrame');

stickerBtn.addEventListener('click', ()=>{
  stickerPanel.style.display = stickerPanel.style.display === 'flex' ? 'none' : 'flex';
});

// 스티커 선택 → 프레임에 추가
document.querySelectorAll('.sticker-item').forEach(sticker=>{
  sticker.addEventListener('click', ()=>{
    const newSticker = document.createElement('img');
    newSticker.src = sticker.src;
    newSticker.className = 'sticker-on-frame';
    newSticker.style.position = 'absolute';
    newSticker.style.top = '50px';
    newSticker.style.left = '50px';
    newSticker.style.width = '80px';
    newSticker.style.height = '80px';
    newSticker.style.cursor = 'grab';
    photoFrame.appendChild(newSticker);

    // 드래그 기능
    let offsetX, offsetY, isDragging = false;
    newSticker.addEventListener('mousedown', e=>{
      isDragging = true;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
    });
    window.addEventListener('mousemove', e=>{
      if(isDragging){
        const rect = photoFrame.getBoundingClientRect();
        let x = e.clientX - rect.left - offsetX;
        let y = e.clientY - rect.top - offsetY;
        newSticker.style.left = `${x}px`;
        newSticker.style.top = `${y}px`;
      }
    });
    window.addEventListener('mouseup', ()=>{ isDragging = false; });
  });
});

// ----------------- 텍스트 기능 -----------------
const textBtn = document.getElementById('textBtn');
textBtn.addEventListener('click', ()=>{
  const text = prompt("추가할 텍스트를 입력하세요:");
  if(text){
    const newText = document.createElement('div');
    newText.textContent = text;
    newText.className = 'text-on-frame';
    newText.style.position = 'absolute';
    newText.style.top = '100px';
    newText.style.left = '50px';
    newText.style.fontSize = '20px';
    newText.style.color = '#FF0000';
    newText.style.cursor = 'grab';
    photoFrame.appendChild(newText);

    // 드래그 기능
    let offsetX, offsetY, isDragging = false;
    newText.addEventListener('mousedown', e=>{
      isDragging = true;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
    });
    window.addEventListener('mousemove', e=>{
      if(isDragging){
        const rect = photoFrame.getBoundingClientRect();
        let x = e.clientX - rect.left - offsetX;
        let y = e.clientY - rect.top - offsetY;
        newText.style.left = `${x}px`;
        newText.style.top = `${y}px`;
      }
    });
    window.addEventListener('mouseup', ()=>{ isDragging = false; });
  }
});

// ----------------- 완료 버튼 -----------------
const completeBtn = document.getElementById('completeBtn');
completeBtn.addEventListener('click', ()=>{
  const frameRect = photoFrame.getBoundingClientRect();
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = frameRect.width;
  tempCanvas.height = frameRect.height;
  const tempCtx = tempCanvas.getContext('2d');

  // 업로드 이미지 그리기
  tempCtx.drawImage(uploadedImage, 0, 0, frameRect.width, frameRect.height);

  // 스티커/텍스트 요소 그리기
  const elements = photoFrame.querySelectorAll('.sticker-on-frame, .text-on-frame');
  elements.forEach(el=>{
    const style = window.getComputedStyle(el);
    const x = parseFloat(style.left);
    const y = parseFloat(style.top);

    if(el.tagName === 'IMG'){ // 스티커
      tempCtx.drawImage(el, x, y, el.width, el.height);
    } else { // 텍스트
      tempCtx.font = style.fontSize + ' Arial';
      tempCtx.fillStyle = style.color;
      tempCtx.fillText(el.textContent, x, y + parseInt(style.fontSize));
    }
  });

  // 결과 페이지로 전달
  const finalImage = tempCanvas.toDataURL('image/png');
  localStorage.setItem('finalImage', finalImage);
  window.location.href = 'result.html';
});
