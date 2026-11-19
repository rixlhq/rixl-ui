type Rgb = [number, number, number];

/**
 * Paints CSS colours onto a one-pixel canvas, which parses whatever Chromium serialises for a computed
 * colour (`oklab()`, `color(srgb …)` from `color-mix`) and composites alpha as the browser does.
 */
function pixel(layers: string[]): Rgb {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext("2d", {colorSpace: "srgb", willReadFrequently: true})!;
  for (const layer of layers) {
    context.fillStyle = layer;
    context.fillRect(0, 0, 1, 1);
  }
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}

function luminance([r, g, b]: Rgb) {
  const [lr, lg, lb] = [r, g, b].map((channel) => {
    const unit = channel / 255;
    return unit <= 0.04045 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

/**
 * WCAG contrast ratio of `text`'s computed colour on `surface`'s computed background, where the surface
 * (often a translucent tint) is composited over `backdrop`'s background. Colours are 8-bit sRGB, as painted.
 */
export function contrastRatio(text: Element, surface: Element, backdrop: Element): number {
  const surfaceRgb = paintedBackground(surface, backdrop);
  const textRgb = pixel([
    getComputedStyle(backdrop).backgroundColor,
    getComputedStyle(surface).backgroundColor,
    getComputedStyle(text).color,
  ]);
  const [lighter, darker] = [luminance(surfaceRgb), luminance(textRgb)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

/** The 8-bit sRGB colour `surface` paints, composited over `backdrop`'s background. */
export function paintedBackground(surface: Element, backdrop: Element): [number, number, number] {
  return pixel([getComputedStyle(backdrop).backgroundColor, getComputedStyle(surface).backgroundColor]);
}
