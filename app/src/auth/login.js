import {inject} from 'aurelia-framework'
import {AuthService} from './../services/auth_service'
import { Router } from 'aurelia-router';

@inject(AuthService, Router)
export class Login {

    constructor(authService, router) {
        this.auth = authService;
        this.router = router;
    }

    /**
     * Hace login y si es exitoso redirecciona a '/'
     */
    authenticate(username, password) {
        // Intenta autenticarse
        this.auth.authenticate(username, password)
            .then(data => {
                // Autenticado, Navegar
                return this.router.navigate('');
            })
            .catch(() => {
                // Fallo, No hacer nada
            });
    }

}
