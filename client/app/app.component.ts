import { Component } from '@angular/core';
import { Auth } from './auth.service';

@Component({
  selector: 'app-root',
  providers: [ Auth ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
        constructor(private auth: Auth) {}
        
 }
