import { Component } from '@angular/core';
import { Auth } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  providers: [ Auth ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
        router;
        constructor(private auth: Auth,  router: Router) {
                this.router = router;
        }
 }
