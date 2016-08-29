import { StoresService } from './../services/stores_service';


import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(StoresService, Router)
export class Index {

    stores = [];

    constructor(storesService, router) {
        this.service = storesService;
        this.router = router;
    }

    activate() {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this.service.getAll()
                .then(stores => {
                    _this.stores = stores
                    resolve();
                })
                .catch(response => {
                    if(response.code === 'authentication.fail.token_expired_or_invalid') {
                        _this.router.navigate('auth/login');
                    }
                    resolve();
                });
        });
    }

    navigate(storeId) {
        this.router.navigateToRoute('products', { id: storeId });
    }
}
