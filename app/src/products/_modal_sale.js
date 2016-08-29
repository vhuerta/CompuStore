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
        this.binding.propertyObserver(this.model, 'openSaleModal').subscribe(this.openSaleModalChanged);
    }

    openSaleModalChanged() {
        bs("#modal_sale").modal('toggle');
    }
}
