import { AuthService } from './auth_service'
import { MessageService } from './message_service';

import { inject } from 'aurelia-framework';

@inject(AuthService, MessageService)
export class ProductsService {

    constructor(authService, messageService) {
        this.auth = authService;
        this.message = messageService;
    }

    get(filters) {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this.auth.get('products', filters).then(response => resolve(response.data)).catch(err => {
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

    sale(productId, storeId) {
        let _this = this;
        let id = this.auth.currentUser.id;
        return new Promise((resolve, reject) => {
            this.auth.post('sales', { products_id: productId, store_id: storeId, users_id: id })
                .then(response => resolve(response.data))
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
        });
    }

}
