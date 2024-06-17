import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { OTextInputComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-public-browser',
  templateUrl: './public-browser.component.html',
  styleUrls: ['./public-browser.component.css']
})
export class PublicBrowserComponent {
  
  searchQuery: string = '';
  @ViewChild('browserInput') browserInput : OTextInputComponent;

  constructor( 
    private router: Router,
    private dataService: DataService,
  ) { }

  search() {
    this.searchQuery = this.browserInput.getValue();
    this.dataService.setSearchValue(this.searchQuery);
    this.router.navigate(['/view']);  
  }

  onKeyUp(){
    this.search();
  }

}
