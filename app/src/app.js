
import { AuthenticatedStep } from './auth/filters/authenticated';
import { RefreshTokenStep } from './auth/filters/refresh_token';
import {inject} from 'aurelia-framework';

/**
 * Clase App, esta clase contiene las rutas de la aplicacion e indica que modulo es para cada Ruta
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
@inject(AuthenticatedStep, RefreshTokenStep) // Se injectan filtros para la navegacion a rutas seguras
export class App {

    constructor(authenticatedStep, refreshTokenStep) {
        this.authenticatedStep = authenticatedStep;
        this.refreshTokenStep = refreshTokenStep;
    }

    configureRouter(config, router) {
        config.title = 'CompusStore';

        // Filtro por los que deben pasar las rutas seguras
        config.addPipelineStep('authorize', this.authenticatedStep); // Primero revisa que el usuario este autenticado
        config.addPipelineStep('authorize', this.refreshTokenStep); // Despues se verifica si es necesario refrescar el token

        config.map([
            {route: ['', '/'], name: 'stores', moduleId: './stores/index', nav: true, title: 'Sucursales', auth: true},
            {route: 'auth/login', name: 'auth_login', moduleId: './auth/login', nav: true, title: 'Login'},
            {route: 'products/:id', name: 'products', moduleId: './products/index', nav: false, title: 'Productos', auth: true},
        ]);

        this.router = router;
    }
}
