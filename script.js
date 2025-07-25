const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });

// Free Features
async function trimVideo() {
  const file = document.getElementById('upload').files[0];
  const video = await fetchFile(file);
  
  await ffmpeg.load();
  ffmpeg.FS('writeFile', 'input.mp4', video);
  
  // Trim first 10 seconds
  await ffmpeg.run('-i', 'input.mp4', '-ss', '0', '-t', '10', 'output.mp4');
  
  const data = ffmpeg.FS('readFile', 'output.mp4');
  document.getElementById('preview').src = URL.createObjectURL(
    new Blob([data.buffer], { type: 'video/mp4' })
  );
}

// Pro Features (Locked)
function addFilters() {
  document.getElementById('upgrade-btn').click();
}

// Payment Handler
document.getElementById('upgrade-btn').addEventListener('click', () => {
  alert("Redirect to $1 payment (Stripe/ PayPal)");
});
