import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tienda-online';

  isLogued(): boolean {
    if (sessionStorage.getItem("token") !== null) {
      return true;
    } else {
      return false;
    }
  }
}
