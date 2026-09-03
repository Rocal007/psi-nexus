// Client-Side Canvas Renderer for High-Resolution Viral Soul Share Cards (Spotify-Wrapped Style)
// Generates a luxury 1080x1080 or 1080x1920 talisman image client-side for Instagram Stories & WhatsApp.

export interface ShareCardData {
  userName: string;
  sunSign: string;
  sunDegree: string;
  moonSign: string;
  ascendantSign: string;
  lifePathNumber: number | string;
  dominantElement: string;
  archetypeName: string;
  mantraText: string;
}

export class ShareCardController {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get 2D context from canvas');
    this.ctx = context;
  }

  public render(data: ShareCardData, format: 'square' | 'story' = 'square'): void {
    const width = 1080;
    const height = format === 'story' ? 1920 : 1080;
    this.canvas.width = width;
    this.canvas.height = height;

    const ctx = this.ctx;

    // 1. Deep Cosmic Gradient Background
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.75);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(0.5, '#020617');
    bgGrad.addColorStop(1, '#000000');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Stars & Cosmic Dust (Deterministic seeded distribution)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    for (let i = 0; i < 160; i++) {
      const x = (Math.sin(i * 997) * 0.5 + 0.5) * width;
      const y = (Math.cos(i * 631) * 0.5 + 0.5) * height;
      const radius = (i % 5 === 0) ? 2.5 : 1.2;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Double Gold Ornamental Border
    const margin = 50;
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

    ctx.strokeStyle = 'rgba(253, 224, 71, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(margin + 12, margin + 12, width - (margin + 12) * 2, height - (margin + 12) * 2);

    // Corner Ornaments
    this.drawCorner(margin + 12, margin + 12, 1, 1);
    this.drawCorner(width - margin - 12, margin + 12, -1, 1);
    this.drawCorner(margin + 12, height - margin - 12, 1, -1);
    this.drawCorner(width - margin - 12, height - margin - 12, -1, -1);

    // 4. Brand Header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 24px "Orbitron", sans-serif';
    ctx.fillText('✦  Ψ-NEXUS • KOSMISCHES SEELENBUCH  ✦', width / 2, margin + 80);

    // Decorative Separator
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 180, margin + 105);
    ctx.lineTo(width / 2 + 180, margin + 105);
    ctx.stroke();

    // 5. Central Psi Talisman Symbol
    const centerY = format === 'story' ? 520 : 360;
    ctx.beginPath();
    ctx.arc(width / 2, centerY, 80, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(234, 179, 8, 0.12)';
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 90px "Cinzel", Georgia, serif';
    ctx.fillText('Ψ', width / 2, centerY + 30);

    // 6. User Name & Archetype
    const textBaseY = format === 'story' ? 700 : 510;
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 48px "Cinzel", Georgia, serif';
    ctx.fillText(data.userName || 'Edle Seele', width / 2, textBaseY);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(data.archetypeName || 'Kosmische Seelen-Matrix', width / 2, textBaseY + 45);

    // 7. Core Pillars Grid / Badges (4 Key Pillars)
    const gridY = format === 'story' ? 880 : 620;
    const boxW = 210;
    const boxH = 110;
    const gap = 24;
    const startX = width / 2 - (boxW * 2 + gap * 1.5);

    const pillars = [
      { label: '☉ SONNE', val: data.sunSign, sub: data.sunDegree, color: '#f59e0b' },
      { label: '↑ ASZENDENT', val: data.ascendantSign, sub: 'Seelentor', color: '#06b6d4' },
      { label: '☽ MOND', val: data.moonSign, sub: 'Seelenruhe', color: '#818cf8' },
      { label: '🔢 LEBENSZAHL', val: `Zahl ${data.lifePathNumber}`, sub: 'Pythagoras', color: '#c084fc' }
    ];

    pillars.forEach((p, idx) => {
      const bx = startX + idx * (boxW + gap);
      // Box Background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(bx, gridY, boxW, boxH);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(bx, gridY, boxW, boxH);

      // Label
      ctx.fillStyle = p.color;
      ctx.font = 'bold 14px "Orbitron", sans-serif';
      ctx.fillText(p.label, bx + boxW / 2, gridY + 30);

      // Value
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(p.val, bx + boxW / 2, gridY + 65);

      // Subtitle
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '12px sans-serif';
      ctx.fillText(p.sub, bx + boxW / 2, gridY + 92);
    });

    // 8. Mantra Quote
    const mantraY = format === 'story' ? 1160 : 790;
    if (data.mantraText) {
      ctx.fillStyle = 'rgba(254, 240, 138, 0.9)';
      ctx.font = 'italic 24px Georgia, serif';
      const cleanMantra = `„${data.mantraText.replace(/^["„“]|["”]$/g, '').trim()}“`;
      this.drawWrappedText(ctx, cleanMantra, width / 2, mantraY, 780, 36);
    }

    // 9. Extra Story Highlights (Only in vertical Story format)
    if (format === 'story') {
      const storyBadgeY = 1420;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(margin + 60, storyBadgeY, width - (margin + 60) * 2, 180);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(margin + 60, storyBadgeY, width - (margin + 60) * 2, 180);

      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 20px "Orbitron", sans-serif';
      ctx.fillText('12-TORE SEELENMATRIX SYNTHESE', width / 2, storyBadgeY + 45);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '18px sans-serif';
      ctx.fillText(`Element: ${data.dominantElement} • VSOP87 Ephemeriden • 7 Strahlen`, width / 2, storyBadgeY + 85);
      ctx.fillText(`Human Design Matrix • Pythagoräische Meisterzahlen`, width / 2, storyBadgeY + 125);
    }

    // 10. Footer Call-to-Action & URL Watermark
    const footerY = height - margin - 50;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px sans-serif';
    ctx.fillText('Berechne deine eigene Seelenmatrix auf:', width / 2, footerY - 28);

    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 28px "Orbitron", monospace';
    ctx.fillText('psi-nexus.de', width / 2, footerY + 8);
  }

  private drawCorner(x: number, y: number, dx: number, dy: number): void {
    const ctx = this.ctx;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y + 25 * dy);
    ctx.lineTo(x, y);
    ctx.lineTo(x + 25 * dx, y);
    ctx.stroke();
  }

  private drawWrappedText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number): void {
    const words = text.split(' ');
    let line = '';
    let curY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, curY);
        line = words[n] + ' ';
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, curY);
  }

  public download(filename: string = 'psi-nexus-seelensiegel.png'): void {
    const link = document.createElement('a');
    link.download = filename;
    link.href = this.canvas.toDataURL('image/png', 1.0);
    link.click();
  }

  public async share(title: string = 'Mein Kosmisches Seelen-Siegel', text: string = 'Entdecke dein Radix & Seelenbuch auf psi-nexus.de'): Promise<boolean> {
    if (!navigator.canShare) return false;

    return new Promise((resolve) => {
      this.canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }
        try {
          const file = new File([blob], 'seelensiegel.png', { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title,
              text,
              files: [file],
              url: window.location.href
            });
            resolve(true);
          } else {
            resolve(false);
          }
        } catch {
          resolve(false);
        }
      }, 'image/png', 1.0);
    });
  }
}
