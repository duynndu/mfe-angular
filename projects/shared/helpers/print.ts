export function printElement(selector: string) {
  let elContainer = document.querySelector('#print-container') as HTMLElement;
  if (!elContainer) {
    elContainer = document.createElement('div');
    elContainer.id = 'print-container';
    document.body.appendChild(elContainer);
  }

  // Lấy element cần in
  const elToPrint = document.querySelector(selector);
  if (!elToPrint) return;

  const cloned = elToPrint.cloneNode(true) as HTMLElement;

  // Loại bỏ các container nguồn ẩn (source container)
  cloned.querySelectorAll('.page-a4-source, .page-a5-source').forEach((el) => el.remove());

  // Đồng bộ giá trị và style của input / textarea sang bản sao in
  const originalInputs = elToPrint.querySelectorAll('input, textarea, select');
  const clonedInputs = cloned.querySelectorAll('input, textarea, select');
  originalInputs.forEach((orig, idx) => {
    const clone = clonedInputs[idx] as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    if (clone && orig) {
      if ((orig as HTMLInputElement).type === 'checkbox' || (orig as HTMLInputElement).type === 'radio') {
        (clone as HTMLInputElement).checked = (orig as HTMLInputElement).checked;
      }
      clone.value = (orig as HTMLInputElement).value;
      if ((orig as HTMLElement).style.height) {
        (clone as HTMLElement).style.height = (orig as HTMLElement).style.height;
      }
      if ((orig as HTMLElement).style.minHeight) {
        (clone as HTMLElement).style.minHeight = (orig as HTMLElement).style.minHeight;
      }
    }
  });

  // Gắn clone vào container
  elContainer.innerHTML = '';
  elContainer.appendChild(cloned);

  // Tạo style in chuẩn: kích thước A4 cố định, triệt tiêu lề, position static
  const style = document.createElement('style');
  style.textContent = `
    #print-container {
      display: none;
    }
    @media print {
      @page {
        size: 210mm 297mm;
        margin: 0mm;
      }
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      body, html {
        margin: 0 !important;
        padding: 0 !important;
        width: 210mm !important;
        height: auto !important;
        background: #fff !important;
        overflow: visible !important;
      }
      body > *:not(#print-container) {
        display: none !important;
      }
      #print-container {
        display: block !important;
        position: static !important;
        width: 210mm !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
      }
      .page-a4-sheet {
        width: 210mm !important;
        height: 297mm !important;
        min-height: 297mm !important;
        max-height: 297mm !important;
        margin: 0 !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
      .page-a4-sheet:not(:last-child) {
        page-break-after: always !important;
        break-after: page !important;
      }
      .page-a4-sheet:last-child {
        page-break-after: avoid !important;
        break-after: avoid !important;
      }
    }
  `;
  document.head.appendChild(style);
  setTimeout(() => {
    elContainer.innerHTML = '';
    style.remove();
  }, 1000);
  window.print();
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

  const cloned = elToPrint.cloneNode(true) as HTMLElement;

  // Loại bỏ các container nguồn ẩn (source container)
  cloned.querySelectorAll('.page-a4-source, .page-a5-source').forEach((el) => el.remove());

  // Đồng bộ giá trị và style của input / textarea sang bản sao in
  const originalInputs = elToPrint.querySelectorAll('input, textarea, select');
  const clonedInputs = cloned.querySelectorAll('input, textarea, select');
  originalInputs.forEach((orig, idx) => {
    const clone = clonedInputs[idx] as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    if (clone && orig) {
      if ((orig as HTMLInputElement).type === 'checkbox' || (orig as HTMLInputElement).type === 'radio') {
        (clone as HTMLInputElement).checked = (orig as HTMLInputElement).checked;
      }
      clone.value = (orig as HTMLInputElement).value;
      if ((orig as HTMLElement).style.height) {
        (clone as HTMLElement).style.height = (orig as HTMLElement).style.height;
      }
      if ((orig as HTMLElement).style.minHeight) {
        (clone as HTMLElement).style.minHeight = (orig as HTMLElement).style.minHeight;
      }
    }
  });

  // Gắn clone vào container
  elContainer.innerHTML = '';
  elContainer.appendChild(cloned);

  // Tạo style in chuẩn
  const style = document.createElement('style');
  style.textContent = `
    #print-container {
      display: none;
    }
    @media print {
      @page {
        size: 210mm 297mm;
        margin: 0mm;
      }
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      body, html {
        margin: 0 !important;
        padding: 0 !important;
        width: 210mm !important;
        height: auto !important;
        background: #fff !important;
        overflow: visible !important;
      }
      body > *:not(#print-container) {
        display: none !important;
      }
      #print-container {
        display: block !important;
        position: static !important;
        width: 210mm !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
      }
      .page-a4-sheet {
        width: 210mm !important;
        height: 297mm !important;
        min-height: 297mm !important;
        max-height: 297mm !important;
        margin: 0 !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
      .page-a4-sheet:not(:last-child) {
        page-break-after: always !important;
        break-after: page !important;
      }
      .page-a4-sheet:last-child {
        page-break-after: avoid !important;
        break-after: avoid !important;
      }
    }
  `;
  document.head.appendChild(style);
  setTimeout(() => {
    elContainer.innerHTML = '';
    style.remove();
  }, 1000);
};

export const handlePrint = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
    e.preventDefault();
    handleBeforePrint('[c-id="123456"], .content-root, Root, root');
    window.print();
  }
};
