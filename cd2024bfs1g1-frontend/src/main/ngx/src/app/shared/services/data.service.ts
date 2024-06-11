import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private searchService = new BehaviorSubject<string>(''); 
  search = this.searchService.asObservable();

  constructor(
    private router: Router,
  ) { }

  setSearchValue(value: string){
    this.searchService.next(value);
  }

  resetSearchValue(){ 
    this.searchService.next(' ');
  }

}
