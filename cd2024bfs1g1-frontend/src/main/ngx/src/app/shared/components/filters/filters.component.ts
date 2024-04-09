import { Component } from "@angular/core";


@Component({
  selector: "filter",
  templateUrl: "filters.component.html",
  styleUrls: ["filters.component.scss"],
  inputs: ['title']
})
export class FilterComponent {

  public title:string = 'FILTER';
  constructor() {  }

}
