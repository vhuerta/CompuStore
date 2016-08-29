import { AuthService } from './../services/auth_service';
import { StoresService } from './../services/stores_service';
import { ProductsService } from './../services/products_service';
import { MessageService } from './../services/message_service';

import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(AuthService, StoresService, ProductsService, MessageService, Router)
export class Index {

    currentStore = null;
    currentStock = null;
    currentSale = null;
    stores = [];
    products = [];
    filters = {
        name: '',
        key: ''
    };

    openStockModal = false;
    openSaleModal = false;


    constructor(authService, storesService, productsService, messageService, router) {
        this.authService = authService;
        this.storesService = storesService;
        this.productsService = productsService;
        this.message = messageService;
        this.router = router;
    }

    activate(params) {
        let _this = this;
        this.currentStore = params.id;
        return this.loadData();
    }

    loadData() {
        let _this = this;
        return new Promise((resolve, reject) => {
            Promise.all([
                _this.storesService.getAll(),
                _this.productsService.get(this.filters)
            ]).then(([stores, products]) => {
                _this.stores = stores
                _this.products = products.records;
                resolve();
            }).catch(response => {
                if(response.code === 'authentication.fail.token_expired_or_invalid') {
                    _this.router.navigate('auth/login');
                }
                resolve();
            });
        });
    }

    stock(product) {
        let stock = product.stocks.find(s => s.id == this.currentStore);
        return stock.stock || 0;
    }

    storeName() {
        let store = this.stores.find(s => s.id === this.currentStore);
        return store.name || '';
    }

    storesStock(product) {
        this.currentStock = product;
        this.openStockModal = !this.openStockModal;
    }

    sale(product) {
        let _this = this;
        this.productsService.sale(product.id, this.currentStore).then(response => {
            _this.openSaleModal = !_this.openSaleModal;
            _this.currentStock = product;
            _this.currentSale = response;
            this.loadData();
        }).catch(response => {
            if(response.code === 'authentication.fail.token_expired_or_invalid') {
                _this.router.navigate('auth/login');
            } else {
                _this.loadData();
            }
        });
    }

    currentUser() {
        return this.authService.currentUser.username;
    }
}
