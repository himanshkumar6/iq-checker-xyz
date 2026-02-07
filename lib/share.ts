
export interface ShareOptions {
  title: string;
  text: string;
  url: string;
}

/**
 * Universal share utility that prioritizes Web Share API 
 * and fallbacks to Clipboard API. Supports file sharing if available.
 */
export const shareResult = async (options: ShareOptions, files?: File[]): Promise<'shared' | 'copied' | 'failed'> => {
  if (typeof window === 'undefined') return 'failed';

  const { title, text, url } = options;
  const shareData: ShareData = { title, text, url };

  // Try Native Share API with files if supported
  if (navigator.share && navigator.canShare) {
    const dataToShare = { ...shareData };
    if (files && files.length > 0 && navigator.canShare({ files })) {
      dataToShare.files = files;
    }

    try {
      await navigator.share(dataToShare);
      return 'shared';
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        return 'failed';
      }
      console.warn('Native share failed, falling back to clipboard.', err);
    }
  }

  // Fallback to Clipboard API
  try {
    const fullText = `${text}\n\nCheck it out: ${url}`;
    await navigator.clipboard.writeText(fullText);
    return 'copied';
  } catch (err) {
    console.error('Share and Clipboard both failed:', err);
    return 'failed';
  }
};

/**
 * Internal helper to draw the result card on a canvas
 */
const drawResultCanvas = (
  title: string,
  value: string,
  label: string,
  footer: string
): HTMLCanvasElement | null => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  canvas.width = 1080;
  canvas.height = 1080;

  // Background
  const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
  gradient.addColorStop(0, '#0f172a'); // slate-900
  gradient.addColorStop(1, '#1e293b'); // slate-800
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1080, 1080);

  // Decoration
  ctx.beginPath();
  ctx.arc(1080, 0, 400, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Branding
  ctx.fillStyle = '#3b82f6';
  ctx.font = 'bold 40px Plus Jakarta Sans, sans-serif';
  ctx.fillText('IQ Checker XYZ', 540, 80);

  // Title
  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 36px Plus Jakarta Sans, sans-serif';
  ctx.fillText(title, 540, 380);

  // Result Value
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 280px Plus Jakarta Sans, sans-serif';
  ctx.fillText(value, 540, 560);

  // Badge
  const badgeText = label.toUpperCase();
  ctx.font = 'bold 40px Plus Jakarta Sans, sans-serif';
  const textWidth = ctx.measureText(badgeText).width;
  const padding = 40;
  const badgeW = textWidth + padding * 2;
  const badgeH = 80;
  const badgeX = 540 - badgeW / 2;
  const badgeY = 740;

  ctx.fillStyle = '#3b82f6';
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 40);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.fillText(badgeText, 540, badgeY + badgeH / 2);

  // Footer
  ctx.fillStyle = '#64748b';
  ctx.font = '500 24px Plus Jakarta Sans, sans-serif';
  ctx.fillText(footer, 540, 1000);

  ctx.font = '400 18px Plus Jakarta Sans, sans-serif';
  ctx.fillText('Analysis for entertainment purposes only at IQCHECKERXYZ.COMPRESSPDFTO200KB.ONLINE', 540, 1040);

  return canvas;
};

/**
 * Generates a Blob for the result image
 */
export const generateResultImageBlob = (
  title: string,
  value: string,
  label: string,
  footer: string
): Promise<Blob | null> => {
  return new Promise((resolve) => {
    const canvas = drawResultCanvas(title, value, label, footer);
    if (!canvas) {
      resolve(null);
      return;
    }
    canvas.toBlob((blob) => resolve(blob), 'image/png', 1.0);
  });
};

/**
 * Helper to download the standardized result image
 */
export const downloadResultImage = (
  title: string, 
  value: string, 
  label: string, 
  footer: string,
  filename: string
) => {
  const canvas = drawResultCanvas(title, value, label, footer);
  if (!canvas) return;

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
};
