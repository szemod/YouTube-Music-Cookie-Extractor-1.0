chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'music.youtube.com' },
      })],
      actions: [new chrome.declarativeContent.ShowAction()]
    }]);
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.getCookies) {
    chrome.cookies.getAll({ domain: '.youtube.com' }, (cookies) => {
      console.log('Cookies:', cookies); // Naplózzuk a cookie-kat
      if (cookies.length === 0) {
        console.warn('No cookies found for the specified domain');
      }
      let cookieString = '';
      cookies.forEach(cookie => {
        cookieString += `${cookie.name}=${cookie.value}; `;
      });
      console.log('Cookie String:', cookieString); // Naplózzuk a cookie stringet
      sendResponse({ cookieString });
    });
    return true; // Indicates that the response is asynchronous.
  }
});
