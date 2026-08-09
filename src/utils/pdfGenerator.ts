import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePdfFromHtml(
  htmlContent: string,
  filename: string = 'DataLens_Documentacion.pdf',
  onProgress?: (status: string) => void
): Promise<void> {
  let iframe: HTMLIFrameElement | null = null;

  try {
    if (onProgress) onProgress('Preparando entorno de renderizado...');

    // 1. Create hidden isolated iframe for 100% accurate style & web font rendering
    iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.left = '-9999px';
    iframe.style.top = '0';
    iframe.style.width = '840px'; // Standard A4 desktop width at ~96dpi
    iframe.style.height = '1000px';
    iframe.style.border = 'none';

    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow?.document;
    if (!iframeDoc) {
      throw new Error('No se pudo inicializar el documento del iframe');
    }

    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();

    // 2. Wait for fonts and styles to resolve
    if (onProgress) onProgress('Cargando tipografía y recursos...');
    await new Promise((resolve) => setTimeout(resolve, 350));

    if (iframeDoc.fonts && iframeDoc.fonts.ready) {
      await iframeDoc.fonts.ready;
    }

    const container = iframeDoc.querySelector('.document-container') as HTMLElement;
    if (!container) {
      throw new Error('No se encontró el contenedor del documento');
    }

    // Set height to accommodate full document
    const fullHeight = Math.max(container.scrollHeight, iframeDoc.body.scrollHeight);
    iframe.style.height = `${fullHeight + 120}px`;

    // 3. Render full document to high-resolution canvas
    if (onProgress) onProgress('Capturando lienzo de alta definición...');

    const canvas = await html2canvas(container, {
      scale: 2, // High resolution crisp rendering
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 840,
    });

    if (onProgress) onProgress('Calculando saltos de página inteligentes...');

    // 4. Calculate smart page breaks based on DOM block elements
    const containerRect = container.getBoundingClientRect();

    // Query all block elements that should not be split horizontally
    const blockElements = Array.from(
      container.querySelectorAll<HTMLElement>(
        'h1, h2, h3, h4, p, blockquote, pre, table, tr, ul, ol, hr, .table-responsive'
      )
    );

    // Canvas scaling factor (canvas pixels / CSS pixels)
    const scaleFactor = canvas.width / containerRect.width;

    // Get element bounding boxes relative to container top in canvas pixels
    const elementBounds = blockElements.map((el) => {
      const rect = el.getBoundingClientRect();
      const top = (rect.top - containerRect.top) * scaleFactor;
      const bottom = (rect.bottom - containerRect.top) * scaleFactor;
      const isHeader = /^H[1-4]$/i.test(el.tagName);
      return { top, bottom, height: bottom - top, isHeader, tag: el.tagName };
    });

    // A4 dimensions setup in mm & canvas pixels
    const pdfWidthMm = 210;
    const pdfHeightMm = 297;
    const marginMm = 12; // Top/bottom page margin in mm
    const usablePdfHeightMm = pdfHeightMm - marginMm * 2; // 273mm

    const pxPerMm = canvas.width / pdfWidthMm; // Canvas pixels per mm
    const usablePagePx = usablePdfHeightMm * pxPerMm;

    // Determine slice cut points
    const totalCanvasHeight = canvas.height;
    const slices: { startY: number; endY: number }[] = [];
    let currentY = 0;

    while (currentY < totalCanvasHeight - 10) {
      const targetY = currentY + usablePagePx;

      if (targetY >= totalCanvasHeight) {
        slices.push({ startY: currentY, endY: totalCanvasHeight });
        break;
      }

      // Check if targetY cuts through any block element
      let breakY = targetY;
      const straddledElement = elementBounds.find(
        (b) => b.top < targetY && b.bottom > targetY
      );

      if (straddledElement) {
        // If element height fits within a page, break before it
        if (straddledElement.height < usablePagePx) {
          breakY = straddledElement.top - 6 * scaleFactor; // 6px buffer before element
        }
      }

      // Prevent orphaned headers near the page bottom
      const orphanHeader = elementBounds.find(
        (b) => b.isHeader && b.top >= currentY && b.top < breakY && breakY - b.top < 60 * scaleFactor
      );
      if (orphanHeader && orphanHeader.top - 10 * scaleFactor > currentY) {
        breakY = orphanHeader.top - 10 * scaleFactor;
      }

      // Safeguard against tiny slices or infinite loops
      if (breakY <= currentY + 100 * scaleFactor) {
        breakY = targetY;
      }

      slices.push({ startY: currentY, endY: breakY });
      currentY = breakY;
    }

    // 5. Generate multi-page jsPDF document
    if (onProgress) onProgress('Compilando páginas PDF...');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    for (let i = 0; i < slices.length; i++) {
      const slice = slices[i];
      const sliceHeightPx = slice.endY - slice.startY;
      const sliceHeightMm = sliceHeightPx / pxPerMm;

      // Crop canvas slice
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = Math.max(1, sliceHeightPx);

      const ctx = sliceCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        ctx.drawImage(
          canvas,
          0,
          slice.startY,
          canvas.width,
          sliceHeightPx,
          0,
          0,
          canvas.width,
          sliceHeightPx
        );
      }

      const sliceImgData = sliceCanvas.toDataURL('image/jpeg', 0.95);

      if (i > 0) {
        pdf.addPage();
      }

      // Draw image slice onto PDF page with top margin
      pdf.addImage(
        sliceImgData,
        'JPEG',
        0,
        marginMm,
        pdfWidthMm,
        sliceHeightMm,
        undefined,
        'FAST'
      );
    }

    if (onProgress) onProgress('Descargando PDF generado...');
    pdf.save(filename);

    if (onProgress) onProgress('¡PDF descargado con éxito!');
  } catch (error) {
    console.error('Error al generar PDF:', error);
    throw error;
  } finally {
    if (iframe && iframe.parentNode) {
      document.body.removeChild(iframe);
    }
  }
}
