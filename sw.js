// RESTKAMP Choir service worker: shows phone notifications sent from the admin area.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = {body: e.data ? e.data.text() : ''}; }
  e.waitUntil(self.registration.showNotification(d.title || 'RESTKAMP Choir', {
    body: d.body || '', icon: '/icon-192.png', badge: '/icon-192.png', data: {url: d.url || '/'}
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(list => {
    for (const w of list) { if ('focus' in w) return w.focus(); }
    return self.clients.openWindow(url);
  }));
});
