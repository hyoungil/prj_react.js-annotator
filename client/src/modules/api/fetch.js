import axios from "axios";

const DOMAIN = "http://localhost:8002";
export const request = (method, url, data) => {
    return axios({
        method,
        url: DOMAIN + url,
        data,
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
};

export const getFetchWithDelay = (url) => {
    console.log(url)
    const promise = new Promise((resolve, reject) => {
        resolve(fetch(url, {
            method: 'GET',
        })
            .then((response) => response.json())
            .catch((error) => console.log(error))
        );
    });

    return promise;
}

export const postFetchWithDelay = (url, param) => {
    const promise = new Promise((resolve, reject) => {
        console.log(url, param)
        resolve(fetch(url, {
            method: 'POST',
            body: JSON.stringify(param),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .catch((error) => "error")
        );
    });

    return promise;
}

export const putFetchWithDelay = (url, param) => {
    const promise = new Promise((resolve, reject) => {
        console.log(url, param)
        resolve(fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        })
            .then((response) => response.json())
            .catch((error) => "error")
        );
    });

    return promise;
}

export const delFetchWithDelay = (url, param) => {
    const promise = new Promise((resolve, reject) => {
        console.log(url, param)
        resolve(fetch(url, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .catch((error) => "error")
        );
    });
    return promise;
}