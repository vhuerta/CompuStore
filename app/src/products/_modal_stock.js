import {BindingEngine} from 'aurelia-binding';
import {inject} from 'aurelia-framework';

import $ from 'jquery';
import bs from 'bootstrap';

@inject(BindingEngine)
export class ModalStock {

    model = null;

    constructor(binding) {
        this.binding = binding;
    }

    activate(model) {
        this.model = model;
        console.log(model.openStockModal);
        this.binding.propertyObserver(this.model, 'openStockModal').subscribe(this.openStockModalChanged);
    }

    openStockModalChanged() {
        bs("#modal_stock").modal('toggle');
    }
}
