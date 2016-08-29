/**
 * Verifica si el usuario esta autentificado
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
import { AuthService } from './../../services/auth_service';

import { Redirect } from 'aurelia-router';
import { inject } from 'aurelia-framework';

@inject(AuthService)
export class AuthenticatedStep {

    constructor(authService) {
        this.auth = authService;
    }

    /**
     * Revisa si la ruta a la que se quiere acceder nesecita autenticacion
     * si nesecita verifica que ya estemos autenticados
     */
    run(navigationInstruction, next) {
        // Verifica si la ruta nesecita autentificación
        if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
            return this.auth.autheticated().then(() => {
                return next();
            }).catch(response => {
                return next.cancel(new Redirect('auth/login'));
            });
        } else {
            return next();
        }
    }
}
