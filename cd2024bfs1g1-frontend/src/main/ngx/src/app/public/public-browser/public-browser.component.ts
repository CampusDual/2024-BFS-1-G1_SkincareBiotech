import { query } from '@angular/animations';
import { Component, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OTextInputComponent, OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-public-browser',
  templateUrl: './public-browser.component.html',
  styleUrls: ['./public-browser.component.css']
})
export class PublicBrowserComponent {
  
  
  searchQuery: string = '';

  constructor( 
    private router: Router 
  ) { }


  search() {
      this.router.navigate(['/view'], {queryParams: {query: this.searchQuery}})  
  }


}
