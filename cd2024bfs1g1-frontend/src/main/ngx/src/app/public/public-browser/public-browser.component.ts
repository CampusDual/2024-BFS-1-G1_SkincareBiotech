import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-public-browser',
  templateUrl: './public-browser.component.html',
  styleUrls: ['./public-browser.component.css']
})
export class PublicBrowserComponent {
  
  searchQuery: string = '';

  constructor( 
    private router: Router,
    private dataService: DataService,
  ) { }

  search() {
    this.dataService.setSearchValue(this.searchQuery);
    this.router.navigate(['/view']);  
  }

  onKeyUp(){
    this.search();
  }

}
