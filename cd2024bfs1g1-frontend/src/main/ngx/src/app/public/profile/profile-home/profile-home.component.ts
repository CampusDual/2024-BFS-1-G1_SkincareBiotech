import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
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

  validatorsNameArray: ValidatorFn[] = [];
 
  constructor(
    protected sanitizer: DomSanitizer,
    protected router: Router,
  ) {     
    this.validatorsNameArray.push(Validators.minLength(5));
    // check whether the entered username meets the maximum length
    this.validatorsNameArray.push(Validators.maxLength(5));  
  }
 
 
  ngAfterViewInit(): void {
 
    //this.loadUserData();  
    this.form.queryData({"USR_ID": 0});
 
  }
 


}