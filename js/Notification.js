'use strict';

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

        var n = document.createElement('div');
        n.className = 'notification-center__notification';
        if (notification.title) {
            var nheader = document.createElement('div');
            nheader.className = 'notification-center__notification__header';

            var nheader_title = document.createElement('div');
            nheader_title.className = 'notification-center__notification__header__title';
            nheader_title.innerHTML = notification.title;

            var nheader_close = document.createElement('div')
            nheader_close.className = 'notification-center__notification__header__close';
            nheader_close.onclick = function() {
                target.hide(notification);
            }

            nheader.appendChild(nheader_title);
            nheader.appendChild(nheader_close);

            n.appendChild(nheader);
        }

        if (notification.text) {
            var ntext = document.createElement('div');
            ntext.className = 'notification-center__notification__text';
            ntext.innerHTML = notification.text;
            n.appendChild(ntext);
        }

        if (notification.image) {
            var nimage = document.createElement('img');
            nimage.className = 'notification-center__notification__image';
            nimage.src = notification.image
            n.appendChild(nimage);
        }

        if (notification.actions) {
            for (var i = 0; i < notification.actions.length; i++) {
                var current = notification.actions[i];
                var naction = document.createElement('button');
                naction.className = 'button--color-white button--size-small button--only-borders';
                naction.id = "nact" + notification.id + '-' + i;
                naction.innerHTML = current.value;

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
        var target = this;
        notification.el.className = "notification-center__notification notification-center__notification--hide";
        setTimeout(function() {
            notification.el.style.visibility = 'hidden';
            notification.isVisible = false;
            notification.el.remove();
            target.__removeBlock();
        }, 500);
    }

    __addBlock() {
        let target = this;
        target.ncBlock = document.createElement('div');
        target.ncBlock.className = 'notification-center';
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