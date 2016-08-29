import reqwest from 'reqwest';

export class ApiService {
    apiPath = 'api/index.php/';

    get(url, params, headers = {}) {
        return reqwest({
            url: `${this.apiPath}${url}`,
            method: 'get',
            data: params,
            headers: headers
        });
    }

    post(url, params, headers = {}) {
        return reqwest({
            url: `${this.apiPath}${url}`,
            method: 'post',
            data: params,
            headers: headers
        });
    }
}
