import { AuthService } from './../services/auth_service';


import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router, AuthService)
export class NavBar {

    currentUser = '';

    constructor(router, authService) {
        this.router = router;
        this.auth = authService;
        this.currentUser = this.auth.currentUser.username;
    }

    stores() {
        this.router.navigate('');
    }

    logout() {
        this.router.navigate('auth/login');
    }

}
