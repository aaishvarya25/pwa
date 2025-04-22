let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// Check if the browser supports Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/js/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// Handling the install prompt event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default mini-infobar
  event.preventDefault();
  deferredPrompt = event;

  // Show the install button
  installBtn.style.display = 'block';

  // Handle the button click to prompt the install
  installBtn.addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});