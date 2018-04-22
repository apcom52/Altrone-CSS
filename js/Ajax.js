class Ajax {
    constructor(url, method = 'GET', params = {}) {
        let target = this;

        if (url == null) {
            throw new Error('Ajax: empty url parameter');
        }

        target.__url = url;
        target.__method = method;
        target.__async = params.__async || false;
        target.__onSuccess = params.__onSuccess() || null;
        target.__onError = params.__onError() || null;
        target.__xhr = new XMLHttpRequest();

        return target;
    }

    get xhr() {
        return this.__xhr;
    }

    setHeader(name, value) {
        if (name == null || value == null) {
            throw new Error('Ajax setHeader(): empty name or value parameter');
        }
        this.__xhr.setRequestHeader(name, value);
    }

    getHeader(name) {
        if (name == null) {
            throw new Error('Ajax getHeader(): empty name parameter');
        }
        return this.__xhr.getResponseHeader(name);
    }

    getHeaders() {
        return this.__xhr.getAllResponseHeaders();
    }

    send(body = '') {
        let target = this;
        target.__xhr.open(target.__method, target.__url, target.__async);
        target.__xhr.send(body);

        if (target.__xhr.status !== 200) {
            if (target.__onError) {
                target.__onError(target.__xhr);
            }
        } else {
            if (target.__onSuccess) {
                target.__onSuccess(target.__xhr);
            }
        }

        return target;
    }
}