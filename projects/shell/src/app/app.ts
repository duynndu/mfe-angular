import { Component } from '@angular/core';
import { RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-shell-root',
  imports: [RouterLink, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
