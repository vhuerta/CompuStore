import { ApiService } from './api_service';
import { StorageService } from './storage_service';
import { MessageService } from './message_service';
import { inject } from 'aurelia-framework';
import moment from 'moment';

@inject(ApiService, StorageService, MessageService)
export class AuthService {
    tokenName = "JWT";
    currentUserName = "user";
    timeName = "time";

    constructor(apiService, storageService, messageService) {
        this.api = apiService;
        this.storage = storageService;
        this.message = messageService;
    }

    /**
     * Metodo para autenticar, Manda los datos si la respuesta es exitosa almacena el token y redirige al index
     * @param username
     * @param password
     */
    authenticate(username, password) {
        let _this = this;
        return new Promise((resolve, reject) => {
            // Hace el post al api
            _this.api.post('auth/token', { username, password }, {})
                .then(response => {
                    // Autenticado
                    _this.token = response.data.token;
                    _this.currentUser = response.data.user;
                    _this.time = new Date();
                    _this.message.set(response);
                    resolve(response.data);
                }).catch(err => {
                    // No autenticado
                    let response;
                    try {
                        response = JSON.parse(err.response);
                    } catch (e) {
                        response = { status: "error", code: "server.error.not_identified" }
                    };
                    _this.message.set(response);
                    reject();
                });
        })
    }

    /**
     * Este metodo retorna una promesa que resuleve si el usuario esta autenticado y se rechaza cuando no
     *
     * @returns {Promise}
     */
    autheticated() {
        let _this = this;
        let token = this.token;
        return new Promise(function(resolve, reject) {
            if (!token) {
                reject({ status: 'fail', code: 'authentication.error.token_not_found' });
            } else {
                _this.get('auth/token_verify', {})
                    .then(resolve)
                    .catch(err => {
                        // No autenticado
                        let response;
                        try {
                            response = JSON.parse(err.response);
                        } catch (e) {
                            response = { status: "error", code: "server.error.not_identified" }
                        };
                        _this.message.set(response);
                        reject(response);
                    });
            }
        });

    }

    /**
     * Este metodo refresca el token
     *
     * @return {Promise}
     */
    refreshToken() {
        let _this = this;

        return new Promise(function(resolve, reject) {
            _this.get('auth/token_refresh', {}).then((response) => {
                    // Autenticado
                    _this.token = response.data.token;
                    _this.currentUser = response.data.user;
                    _this.time = new Date();
                    resolve(response.data);
                })
                .catch(() => { // Catch post
                    // No autenticado
                    let response;
                    try {
                        response = JSON.parse(err.response);
                    } catch (e) {
                        response = { status: "error", code: "server.error.not_identified" }
                    };
                    _this.message.set(response);
                    reject(response);
                });
        });
    }

    /**
     * Retorna true si es tiempo de renovar el token o false si aun no
     *
     * @return boolean
     */
    timeToRefresh() {
        let auth = this;
        let tokenTime = moment(new Date(auth.time));
        return (tokenTime.diff(moment(), 'minutes', true) < -1 ? true : false);
    }

    get(url, params) {
        let token = this.token;
        return this.api.get(url, params, { 'Authorization': token });
    }

    post(url, params) {
        let token = this.token;
        return this.api.post(url, params, { 'Authorization': token });
    }

    get token() {
        return this.storage.get(this.tokenName);
    }

    set token(value) {
        this.storage.set(this.tokenName, value);
    }

    get currentUser() {
        let user = this.storage.get(this.currentUserName);
        return JSON.parse(user);
    }

    set currentUser(value) {
        value = JSON.stringify(value);
        this.storage.set(this.currentUserName, value);
    }

    get time() {
        return this.storage.get(this.timeName);
    }

    set time(value) {
        return this.storage.set(this.timeName, value);
    }
}
