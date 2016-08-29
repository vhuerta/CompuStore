
import { AuthenticatedStep } from './auth/filters/authenticated';
import { RefreshTokenStep } from './auth/filters/refresh_token';
import {inject} from 'aurelia-framework';

@inject(AuthenticatedStep, RefreshTokenStep)
export class App {

    constructor(authenticatedStep, refreshTokenStep) {
        this.authenticatedStep = authenticatedStep;
        this.refreshTokenStep = refreshTokenStep;
    }

    configureRouter(config, router) {
        config.title = 'CompusStore';

        config.addPipelineStep('authorize', this.authenticatedStep);
        config.addPipelineStep('authorize', this.refreshTokenStep);

        config.map([
            {route: ['', '/'], name: 'stores', moduleId: './stores/index', nav: true, title: 'Sucursales', auth: true},
            {route: 'auth/login', name: 'auth_login', moduleId: './auth/login', nav: true, title: 'Login'},
            {route: 'products/:id', name: 'products', moduleId: './products/index', nav: false, title: 'Productos', auth: true},
        ]);

        this.router = router;
    }
}
