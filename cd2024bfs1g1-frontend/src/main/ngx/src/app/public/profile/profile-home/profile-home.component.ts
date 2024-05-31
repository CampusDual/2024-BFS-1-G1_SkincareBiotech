import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OTextInputComponent, OIntegerInputComponent, OntimizeService, OFormComponent } from 'ontimize-web-ngx';
 
@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css']
})
export class ProfileHomeComponent implements AfterViewInit {
 

  @ViewChild('form') form: OFormComponent;
 
  constructor(
    protected sanitizer: DomSanitizer,
    protected router: Router,
  ) {     
  }
 
 
  ngAfterViewInit(): void {
 
    //this.loadUserData();  
    this.form.queryData({"USR_ID": 0});
 
  }
 


}