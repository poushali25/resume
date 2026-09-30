/**
 * Client-Side Smart Background Removal Utility
 * Specially tuned for portrait photographs with solid/studio/wall backgrounds
 * (such as peach, beige, neutral walls, or dark studio backdrops).
 */

export interface CutoutOptions {
  tolerance?: number; // 0 - 100 (default ~32)
  feather?: number; // 0 - 20 (default ~4)
  sampleCorner?: 'topLeft' | 'topRight' | 'auto';
  customBgColor?: { r: number; g: number; b: number } | null;
}

export function removeBackgroundFromImage(
  img: HTMLImageElement,
  options: CutoutOptions = {}
): string {
  const {
    tolerance = 36,
    feather = 6,
    customBgColor = null,
  } = options;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return img.src;

  // Max width/height to ensure ultra-smooth performance in browser
  const maxDim = 1200;
  let w = img.naturalWidth || img.width;
  let h = img.naturalHeight || img.height;

  if (w > maxDim || h > maxDim) {
    if (w > h) {
      h = Math.round((h * maxDim) / w);
      w = maxDim;
    } else {
      w = Math.round((w * maxDim) / h);
      h = maxDim;
    }
  }

  canvas.width = w;
  canvas.height = h;
  ctx.drawImage(img, 0, 0, w, h);

  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;

  // Determine Background Reference Color
  let bgR = 0;
  let bgG = 0;
  let bgB = 0;

  if (customBgColor) {
    bgR = customBgColor.r;
    bgG = customBgColor.g;
    bgB = customBgColor.b;
  } else {
    // Sample top-left and top-right corners (5x5 grid each)
    let sampleCount = 0;
    const sampleBox = 12;

    for (let y = 2; y < sampleBox; y++) {
      for (let x = 2; x < sampleBox; x++) {
        const idx1 = (y * w + x) * 4;
        const idx2 = (y * w + (w - 1 - x)) * 4;
        bgR += data[idx1] + data[idx2];
        bgG += data[idx1 + 1] + data[idx2 + 1];
        bgB += data[idx1 + 2] + data[idx2 + 2];
        sampleCount += 2;
      }
    }

    bgR = Math.round(bgR / sampleCount);
    bgG = Math.round(bgG / sampleCount);
    bgB = Math.round(bgB / sampleCount);
  }

  // Flood fill / connected component mask from the borders
  // This ensures we only remove background pixels connected to the outer border,
  // preventing accidental removal of similar tones inside the face or clothes!
  const visited = new Uint8Array(w * h);
  const queue: number[] = [];

  // Helper to test if a pixel matches background
  const colorDist = (r: number, g: number, b: number) => {
    const dr = r - bgR;
    const dg = g - bgG;
    const db = b - bgB;
    return Math.sqrt(dr * dr * 0.9 + dg * dg * 1.2 + db * db * 0.9); // Perceptual weighting
  };

  const tolDist = (tolerance / 100) * 255;
  const featherDist = (feather / 100) * 120;

  // Seed with border pixels (top, left, right edges)
  // Top edge
  for (let x = 0; x < w; x++) {
    queue.push(x);
    visited[x] = 1;
  }
  // Left and Right edges (upper 75% of image)
  for (let y = 1; y < Math.round(h * 0.75); y++) {
    const leftIdx = y * w;
    const rightIdx = y * w + (w - 1);
    if (!visited[leftIdx]) {
      queue.push(leftIdx);
      visited[leftIdx] = 1;
    }
    if (!visited[rightIdx]) {
      queue.push(rightIdx);
      visited[rightIdx] = 1;
    }
  }

  // BFS Floodfill to identify all exterior background pixels
  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % w;
    const cy = Math.floor(curr / w);

    // Check 4-connected neighbors
    const neighbors = [
      cx > 0 ? curr - 1 : -1,
      cx < w - 1 ? curr + 1 : -1,
      cy > 0 ? curr - w : -1,
      cy < h - 1 ? curr + w : -1,
    ];

    for (let i = 0; i < 4; i++) {
      const nIdx = neighbors[i];
      if (nIdx !== -1 && visited[nIdx] === 0) {
        const pIdx = nIdx * 4;
        const d = colorDist(data[pIdx], data[pIdx + 1], data[pIdx + 2]);

        if (d <= tolDist + featherDist) {
          visited[nIdx] = 1;
          queue.push(nIdx);
        }
      }
    }
  }

  // Now apply alpha transparency based on visited floodfill mask
  for (let i = 0; i < w * h; i++) {
    const pIdx = i * 4;
    if (visited[i] === 1) {
      const d = colorDist(data[pIdx], data[pIdx + 1], data[pIdx + 2]);
      if (d <= tolDist) {
        data[pIdx + 3] = 0; // 100% Transparent
      } else {
        // Feathered soft edge transition
        const alphaRatio = (d - tolDist) / Math.max(featherDist, 1);
        data[pIdx + 3] = Math.round(Math.min(Math.max(alphaRatio, 0), 1) * 255);
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL('image/png');
}
