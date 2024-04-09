import { Component, ViewEncapsulation } from '@angular/core';
import { OTableComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'home-toolbar',
  templateUrl: './home-toolbar.component.html',
  styleUrls: ['./home-toolbar.component.scss'],
  inputs: ['table'],
  host: {
    '[class.home-toolbar]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class HomeToolbarComponent {

  public table: OTableComponent;

}
