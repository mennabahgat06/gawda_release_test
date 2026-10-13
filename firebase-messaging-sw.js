// Receives push notifications while the site is closed or in the background (Flutter web).
// Must live at the web root, next to index.html. The config below is the public Firebase web config.
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDMz2I_01PhT8LBoiYDsltfuv_GyImfqFo',
  authDomain: 'csgawdasys.firebaseapp.com',
  projectId: 'csgawdasys',
  storageBucket: 'csgawdasys.firebasestorage.app',
  messagingSenderId: '365675821770',
  appId: '1:365675821770:web:baf2aed183214d82795233',
});

// Messages that carry a "notification" block are displayed by the browser itself; this handler only
// has to exist so the messaging SDK is active in the service worker.
firebase.messaging().onBackgroundMessage(function (payload) {});

// Clicking the notification focuses the open tab, or opens the site.
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
