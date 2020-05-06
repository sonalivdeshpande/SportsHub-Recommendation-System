import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { }

  title = 'Sports Hub Recommendation System';
  registerView;

  callHomePage(){
    this.registerView="regView2";
    this.router.navigate(['/login']);
  }
}
