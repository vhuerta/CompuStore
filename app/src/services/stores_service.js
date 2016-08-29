import { AuthService } from './auth_service'
import { MessageService } from './message_service';

import { inject } from 'aurelia-framework';

@inject(AuthService, MessageService)
export class StoresService {

    constructor(authService, messageService) {
        this.auth = authService;
        this.message = messageService;
    }

    getAll() {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this.auth.get('stores', {}).then(response => resolve(response.data)).catch(err => {
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

}
