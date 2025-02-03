document.getElementById('getAndCopyCookie').addEventListener('click', function() {
  chrome.runtime.sendMessage({ getCookies: true }, function(response) {
    console.log('Response:', response); // Naplózzuk a választ
    if (response && response.cookieString) {
      navigator.clipboard.writeText(response.cookieString).then(function() {
        alert('Cookie copied to clipboard!');
      }, function(err) {
        alert('Error copying cookie: ' + err);
      });
    } else {
      alert('Failed to retrieve cookies.');
    }
  });
});
