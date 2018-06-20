import {Component} from '@angular/core';
import { NavService } from '../nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  constructor(
    public navService: NavService) {}

  opened: boolean;
  myToggle() {
    if (this.opened) {
      this.opened = false;

    } else {
      this.opened = true;
    }
    this.navService.set(this.opened);
    this.navService.getSize();
  }
}
