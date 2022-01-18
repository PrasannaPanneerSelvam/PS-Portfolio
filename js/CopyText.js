export default function CopyTextToClipBoard() {
  // Copy to Clipboard - Sources : https://alligator.io/js/copying-to-clipboard/
  const mailIdElement = document.getElementById('copy-mail-id');

  mailIdElement.addEventListener('click', () => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(mailIdElement);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand('copy');
      selection.removeAllRanges();

      mailIdElement.getElementsByClassName('mail')[0].dataset.status = 'Copied!';
      mailIdElement.classList.add('success');

      setTimeout(() => {
        mailIdElement.classList.remove('success');
        mailIdElement.getElementsByClassName('mail')[0].dataset.status = 'Click to Copy';
      }, 1200);
    } catch (e) { }
  });
}