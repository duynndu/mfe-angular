export function printElement(selector) {
    const elContainer = document.querySelector('#print-container');
    const elToPrint = document.querySelector(selector).cloneNode(true);
    elContainer.appendChild(elToPrint);
    window.print();
    elContainer.innerHTML = '';
}