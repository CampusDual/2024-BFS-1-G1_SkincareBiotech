import { Component, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.app-settings]': 'true'
  }
})
export class SettingsComponent {



}
