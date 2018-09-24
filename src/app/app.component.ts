import {Component} from '@angular/core';
import {ContentMode, NavigationService} from './services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'headfwd-intranet';
  ContentMode = ContentMode;
  activeContendMode: ContentMode;

  constructor(private navigation: NavigationService) {
    navigation.contentMode.subscribe((contentMode: ContentMode) => {
      this.activeContendMode = contentMode;
      }
    );
  }


}
