import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    //window.localStorage.setItem('token', '932746932876345');
    const token = window.localStorage.getItem('token');
    //window.localStorage.removeItem('token');
  }
}
