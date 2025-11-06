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

  // Gắn clone vào container
  elContainer.innerHTML = '';
  elContainer.appendChild(cloned);

  // Tạo style chỉ hiện container khi in
  const style = document.createElement('style');
  style.textContent = `
    #print-container {
      visibility: hidden;
    }
    @media print {
      body {
        position: relative;
      }
      body, html {
        margin: 0;
        padding: 0;
      }
      body > *:not(#print-container) {
        display: none;
      }
      #print-container {
        position: absolute;
        top: 0;
        left: 0;
        visibility: visible;
      }
    }
  `;
  document.head.appendChild(style);
  setTimeout(() => {
    elContainer.innerHTML = '';
    style.remove();
  });
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

  // Gắn clone vào container
  elContainer.innerHTML = '';
  elContainer.appendChild(cloned);

  // Tạo style chỉ hiện container khi in
  const style = document.createElement('style');
  style.textContent = `
    #print-container {
      visibility: hidden;
    }
    @media print {
      body {
        position: relative;
      }
      body, html {
        margin: 0;
        padding: 0;
      }
      body > *:not(#print-container) {
        display: none;
      }
      #print-container {
        position: absolute;
        top: 0;
        left: 0;
        visibility: visible;
      }
    }
  `;
  document.head.appendChild(style);
  setTimeout(() => {
    elContainer.innerHTML = '';
    style.remove();
  });
};

export const handlePrint = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
    console.log('beforeprint');
    e.preventDefault();
    handleBeforePrint('.content-root');
    window.print();
  }
};
