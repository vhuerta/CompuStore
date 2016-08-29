/**
 * MessageService Service
 *
 * @author Victor Huerta <victor@blackcore.com.mx>
 */

import {I18N} from 'aurelia-i18n';
import {inject} from 'aurelia-framework';

@inject(I18N)
export class MessageService {

    message = {
        type: '',
        text: ''
    };

    constructor(i18n) {
        this.i18n = i18n;
    }

    set({status: type, code: text, data}) {
        this.message = {
            title: this.i18n.tr(type, data),
            text: this.i18n.tr(text, data),
            type: type
        };
    }

}
