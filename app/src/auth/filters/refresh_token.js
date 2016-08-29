/**
 * Renueva en token cuando es nesesario
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
import { AuthService } from './../../services/auth_service';

import { Redirect } from 'aurelia-router';
import { inject } from 'aurelia-framework';

@inject(AuthService)
export class RefreshTokenStep {

    constructor(authService) {
        this.auth = authService;
    }

    /**
     * Verifica si es tiempo de refrescar el token,
     * si lo es lo refresca y almacena el nuevo
     */
    run(navigationInstruction, next) {
        let _this = this;

        if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
            if (this.auth.timeToRefresh()) {
                return _this.auth.refreshToken().then(() => {
                    return next();
                }).catch(response => {
                    return next.cancel(new Redirect('auth/login'));
                });
            } else {
                return next();
            }

        } else {
            return next();
        }
    }
}
