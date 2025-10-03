export async function makeWhiteTransparent(imgUrl, options = {}) {
  const { threshold = 240, cacheKey = `transparent_${imgUrl}` } = options;

  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return cached;
  } catch {}

  const dataUrl = await new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imageData.data;
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];
          // If pixel is near-white, make it transparent
          if (r >= threshold && g >= threshold && b >= threshold) {
            d[i + 3] = 0; // alpha
          }
        }
        ctx.putImageData(imageData, 0, 0);
        const out = canvas.toDataURL('image/png');
        resolve(out);
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = (e) => reject(e);
    img.src = imgUrl;
  });

  try {
    sessionStorage.setItem(cacheKey, dataUrl);
  } catch {}

  return dataUrl;
}
