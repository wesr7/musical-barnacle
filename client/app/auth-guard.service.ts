import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Auth } from './auth.service';

@Injectable()

export class AuthGuard implements CanActivate {
        constructor(private auth: Auth, private router: Router) {}
        
        isLoading;
        canActivate() {
                if(!this.auth.authenticated()) {
                        this.auth.login();
                }
                return true;
        }
}
