import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  darkMode: boolean;

  constructor() { }

  darklight () {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle( 'dark');
  }

  ngOnInit() {
  }

}
