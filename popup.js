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

document.getElementById('saveCookieToFile').addEventListener('click', function() {
  chrome.runtime.sendMessage({ getCookies: true }, function(response) {
    console.log('Response:', response); // Naplózzuk a választ
    if (response && response.cookieString) {
      // Save the cookieString to a file on the user's computer
      const blob = new Blob([response.cookieString], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'cookie.txt';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    } else {
      alert('Failed to retrieve cookies.');
    }
  });
});

