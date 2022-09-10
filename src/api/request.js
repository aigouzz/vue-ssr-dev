import axios  from "./index";

export function postFn(config) {
    return axios({
        ...config,
        method: 'post'
    });
}

export function getFn(config) {
    return axios({
        ...config,
        method: 'get'
    });
}