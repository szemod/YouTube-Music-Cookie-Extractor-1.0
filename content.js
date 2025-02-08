chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.cookieString) {
    const blob = new Blob([message.cookieString], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cookie.txt';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }
});

