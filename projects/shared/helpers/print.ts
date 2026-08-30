export interface PageFormatConfig {
  sizeRule: string;
  widthMm: number;
  heightMm: number;
  isLandscape: boolean;
  type: 'a4' | 'a5' | 'custom';
}

/**
 * Phát hiện loại khổ giấy và định hướng in dựa vào DOM của phần tử được in
 */
export function detectPageFormat(element: Element): PageFormatConfig {
  const pageA5El = element.matches?.('.page-a5-sheet, .page-a5-wrapper')
    ? element
    : element.querySelector('.page-a5-sheet, .page-a5-wrapper');

  const pageA4El = element.matches?.('.page-a4-sheet, .page-a4-wrapper')
    ? element
    : element.querySelector('.page-a4-sheet, .page-a4-wrapper');

  if (pageA5El) {
    const isLandscape = pageA5El.classList.contains('landscape');
    return {
      sizeRule: isLandscape ? 'A5 landscape' : 'A5 portrait',
      widthMm: isLandscape ? 210 : 148,
      heightMm: isLandscape ? 148 : 210,
      isLandscape,
      type: 'a5',
    };
  }

  if (pageA4El) {
    const isLandscape = pageA4El.classList.contains('landscape');
    return {
      sizeRule: isLandscape ? 'A4 landscape' : 'A4 portrait',
      widthMm: isLandscape ? 297 : 210,
      heightMm: isLandscape ? 210 : 297,
      isLandscape,
      type: 'a4',
    };
  }

  // Mặc định là A4 portrait
  return {
    sizeRule: 'A4 portrait',
    widthMm: 210,
    heightMm: 297,
    isLandscape: false,
    type: 'a4',
  };
}

export const handleBeforePrint = (selector: string) => {
  let elContainer = document.querySelector('#print-container') as HTMLElement;
  if (!elContainer) {
    elContainer = document.createElement('div');
    elContainer.id = 'print-container';
    document.body.appendChild(elContainer);
  }

  // Lấy element cần in
  const elToPrint = document.querySelector(selector);
  if (!elToPrint) return;

  const pageFormat = detectPageFormat(elToPrint);

  const cloned = elToPrint.cloneNode(true) as HTMLElement;

  // Đồng bộ giá trị và style của input / textarea / select
  // Chỉ lấy input trong phần hiển thị (loại trừ container nguồn)
  const getVisibleInputs = (root: Element) => {
    return Array.from(root.querySelectorAll('input, textarea, select')).filter((el) => {
      return !el.closest('.page-a4-source, .page-a5-source');
    }) as (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[];
  };

  const originalInputs = getVisibleInputs(elToPrint);
  const clonedInputs = getVisibleInputs(cloned);

  originalInputs.forEach((orig, idx) => {
    const clone = clonedInputs[idx];
    if (clone && orig) {
      if ((orig as HTMLInputElement).type === 'checkbox' || (orig as HTMLInputElement).type === 'radio') {
        (clone as HTMLInputElement).checked = (orig as HTMLInputElement).checked;
      }
      clone.value = orig.value;
      if (orig.style.height) clone.style.height = orig.style.height;
      if (orig.style.minHeight) clone.style.minHeight = orig.style.minHeight;
    }
  });

  // Đồng bộ dữ liệu vẽ từ thẻ <canvas> (chữ ký, Paint component)
  const getVisibleCanvases = (root: Element) => {
    return Array.from(root.querySelectorAll('canvas')).filter((el) => {
      return !el.closest('.page-a4-source, .page-a5-source');
    }) as HTMLCanvasElement[];
  };

  const originalCanvases = getVisibleCanvases(elToPrint);
  const clonedCanvases = getVisibleCanvases(cloned);

  originalCanvases.forEach((origCanvas, idx) => {
    const cloneCanvas = clonedCanvases[idx];
    if (cloneCanvas && origCanvas && origCanvas.width > 0 && origCanvas.height > 0) {
      cloneCanvas.width = origCanvas.width;
      cloneCanvas.height = origCanvas.height;
      const ctx = cloneCanvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(origCanvas, 0, 0);
      }
    }
  });

  // Loại bỏ các container nguồn ẩn sau khi đã đồng bộ
  cloned.querySelectorAll('.page-a4-source, .page-a5-source').forEach((el) => el.remove());

  // Gắn clone vào container
  elContainer.innerHTML = '';
  elContainer.appendChild(cloned);

  // Tạo style in chuẩn phù hợp với khổ giấy và hướng in
  const styleId = 'ngx-vue-print-styles';
  let style = document.getElementById(styleId) as HTMLStyleElement;
  if (!style) {
    style = document.createElement('style');
    style.id = styleId;
    document.head.appendChild(style);
  }

  style.textContent = `
    #print-container {
      display: none;
    }
    @media print {
      @page {
        size: ${pageFormat.sizeRule};
        margin: 0mm !important;
      }
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      body, html {
        margin: 0 !important;
        padding: 0 !important;
        background: #fff !important;
        overflow: visible !important;
        width: 100% !important;
      }
      body > *:not(#print-container) {
        display: none !important;
      }
      #print-container {
        display: block !important;
        position: static !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
        width: 100% !important;
      }
      .page-a4-sheet, .page-a5, .page-a5-sheet {
        margin: 0 !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        box-shadow: none !important;
      }
      .page-a4-sheet:not(:last-child), .page-a5:not(:last-child), .page-a5-sheet:not(:last-child) {
        page-break-after: always !important;
        break-after: page !important;
      }
      .page-a4-sheet:last-child, .page-a5:last-child, .page-a5-sheet:last-child {
        page-break-after: avoid !important;
        break-after: avoid !important;
      }
    }
  `;

  // Dọn dẹp an toàn khi người dùng in xong hoặc hủy hộp thoại
  const cleanup = () => {
    window.removeEventListener('afterprint', cleanup);
    if (elContainer) elContainer.innerHTML = '';
    if (style && style.parentNode) style.remove();
  };

  window.addEventListener('afterprint', cleanup);
  setTimeout(cleanup, 3000); // Fallback nếu trình duyệt không phát sự kiện afterprint
};

export function printElement(selector: string = '[c-id="123456"], .content-root, Root, root') {
  handleBeforePrint(selector);
  window.print();
}

export const handlePrint = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
    e.preventDefault();
    printElement('[c-id="123456"], .content-root, Root, root');
  }
};


