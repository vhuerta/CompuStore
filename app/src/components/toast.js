import { BindingEngine } from 'aurelia-binding';
import { MessageService } from './../services/message_service';
import { inject, bindable } from 'aurelia-framework';
import pnotify from 'pnotify';
import 'pnotify/dist/pnotify.animate';
import 'pnotify/dist/pnotify.buttons';
import 'pnotify/dist/pnotify.nonblock';
import 'pnotify/dist/pnotify.callbacks';
import 'pnotify/dist/pnotify.confirm';
import 'pnotify/dist/pnotify.desktop';
import 'pnotify/dist/pnotify.history';
import 'pnotify/dist/pnotify.mobile';

@inject(Element, BindingEngine, MessageService)
export class ToastCustomElement {

    constructor(element, bindingEngine, messageService) {
        this.element = element;
        this.messageService = messageService;
        this.bindingEngine = bindingEngine;
        pnotify.prototype.options.styling = "bootstrap3";
        pnotify.prototype.options.history.maxonscreen = 4;
        pnotify.prototype.options.delay = 2500;
    }


    attached() {
        this.bindingEngine
            .expressionObserver(this.messageService, 'message')
            .subscribe(this.onChange.bind(this));
    }

    onChange(newValue, oldValue) {

        let icon = "";
        switch (newValue.type) {
            case 'fail':
                icon = 'exclamation';
                break;
            case 'success':
                icon = 'check';
                break;
            case 'error':
                icon = 'times';
                break;
            case 'info':
                icon = 'info';
                break;
            default:
                icon = 'info';
                break;
        }

        let notice = new pnotify({
            title: newValue.title,
            text: newValue.text,
            type: newValue.type,
            icon: `fa fa-${icon} fa-3x alert-icon`,
            buttons: {
                closer: true,
                closer_hover: true,
                sticker: false,
                show_on_nonblock: true
            }
        });

        notice.get().on('click', () => {
            notice.remove();
        });
    }
}
