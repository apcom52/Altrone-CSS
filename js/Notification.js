class Notification {
    /**
     * Constructor of Notification Class
     */
    constructor() {
        let target = this;
        target.log = [];
    }

    /**
     * Send new Notification into Notification Center
     * @param {Object} data - information about notification
     * @returns {{title: string, text: string, image: null, sound: null, actions: null, time: number, visible: boolean, id: number}}
     */
    send(data = {}) {
        let target = this;

        let notification = {
            title: data.title || "",
            text: data.text || "",
            image: data.image || null,
            sound: data.sound || null,
            actions: data.actions || null,
            time: data.time || 5,
            visible: false,
            id: Notification.prototype.lastNotificationId + 1
        };

        target.log.push(notification);
        target.__addNotification(notification);

        return notification;
    }

    __addNotification(notification) {
        let target = this;
        notification.isVisible = true;

        if (!target.ncBlock) {
            target.__addBlock();
        }

        let n = createElement('div', 'notification');
        if (notification.title) {
            let nheader = createElement('div', 'notification__header');
            let nheader_title = createElement('div', 'notification__title', '', {}, notification.title);
            let nheader_close = createElement('div', 'notification__close');
            nheader_close.onclick = function() {
                target.hide(notification);
            };

            nheader.appendChild(nheader_title);
            nheader.appendChild(nheader_close);
            n.appendChild(nheader);
        }

        if (notification.text) {
            let ntext = createElement('div', 'notification__message', '', {}, notification.text);
            n.appendChild(ntext);
        }

        if (notification.image) {
            let nimage = document.createElement('img', 'notification__image', '', {src: notification.src});
            n.appendChild(nimage);
        }

        if (notification.actions) {
            for (let i = 0; i < notification.actions.length; i++) {
                let current = notification.actions[i];
                let naction = createElement('button', 'button--color-white button--size-small button--only-borders', 'nact' + notification.id + '-' + i, {}, current.value);

                if (current.action) {
                    naction.onclick = current.action;
                }

                n.appendChild(naction);
            }
        }

        notification.el = n;

        if (notification.time > 0) {
            setTimeout(function() {
                target.hide(notification);
            }, notification.time * 1000)
        }

        if (notification.sound) {
            console.log(notification.sound);
            notification.sound.play();
        }

        target.ncBlock.appendChild(n);
    }

    /**
     * Hide notification
     * @param {Object} notification - notification, which you want to hide
     */
    hide(notification) {
        let target = this;
        notification.el.className = "notification notification--hide";
        setTimeout(function() {
            notification.el.style.visibility = 'hidden';
            notification.isVisible = false;
            notification.el.remove();
            target.__removeBlock();
        }, 500);
    }

    __addBlock() {
        let target = this;
        target.ncBlock = createElement('div', 'notification-center');
        document.body.appendChild(target.ncBlock);

        return target.ncBlock;
    }

    __removeBlock() {
        let target = this;
        let hasVisibleNotifications = false;

        target.log.forEach(function(item) {
            if (item.isVisible) {
                hasVisibleNotifications = true;
            }
        });

        if (!hasVisibleNotifications) {
            target.ncBlock.remove();
            target.ncBlock = null;
        }
    }
}

Notification.prototype.lastNotificationId = 0;