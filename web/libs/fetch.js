import Storage from './storage';
import { Toast } from 'antd-mobile';

function fillFilePath(filename, cache) {
    let path = `./data/${filename}.json`;
    if (!cache) {
        path = path + `?_dc=${new Date().getTime()}`;
    }
    return path;
}

function requestData(path) {
    return fetch(path, {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response.statusText;
        }
    }).catch(e => {
        Toast.fail(typeof e === "string" ? e : '加载数据失败', 3);
    });
}
export default (filename, cache = false) => {
    let path = fillFilePath(filename, cache),
        storage = new Storage(filename);
    if (__DEV__) {
        return requestData(path).then(json => {
            storage.set(json);
            return json;
        });
    } else {
        let data = storage.get();
        if (data) {
            return Promise.resolve(data)
        } else {
            return requestData(path).then(json => {
                storage.set(json);
                return json;
            });
        }
    }

};