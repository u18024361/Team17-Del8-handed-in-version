import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'protractor';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Profile', url: '/Home', icon: 'body' },
    { title: 'Messages', url: '/messaging', icon: 'mail' },
    { title: 'Group Sessions', url: '/group', icon: 'Calendar' },
    { title: 'Individual Sessions', url: '/individual', icon: 'person' },
    
    
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor( private _router: Router) {}

  public logout = () => {
    localStorage.clear();
    this._router.navigate(["/login"]);
  }
}

