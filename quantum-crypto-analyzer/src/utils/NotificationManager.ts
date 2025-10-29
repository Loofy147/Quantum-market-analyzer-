class NotificationManager {
  /**
   * Push Notification (for browsers)
   */
  static async sendPushNotification(notification) {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/icon.png', // You would need to add an icon file to your public directory
        badge: '/badge.png', // And a badge file
        tag: notification.type
      });
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        this.sendPushNotification(notification);
      }
    }
  }
}

export default NotificationManager;
