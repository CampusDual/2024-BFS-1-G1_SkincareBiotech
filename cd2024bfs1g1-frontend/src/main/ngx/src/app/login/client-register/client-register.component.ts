import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit{
  
  public registerForm: UntypedFormGroup = new UntypedFormGroup({});
  public userCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);
  public pwdCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);
  public usernameCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);
  public userSurnameCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);
  public userEmailCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);
  public userPhoneCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);

  service: OntimizeService;
  redirect = '';
  adminRole = 'admin';
  userRole = 'user';
  sellerRole = 'seller';


  constructor(
    private router: Router,
    protected injector: Injector,
  ){ 
    this.service = this.injector.get(OntimizeService)
   }
  
  ngOnInit(): void {
    this.registerForm.addControl('usr_login', this.userCtrl);
    this.registerForm.addControl('usr_password', this.pwdCtrl);    
    this.registerForm.addControl('usr_name', this.usernameCtrl);    
    this.registerForm.addControl('usr_surname', this.userSurnameCtrl);    
    this.registerForm.addControl('usr_email', this.userEmailCtrl);  
    this.registerForm.addControl('usr_phone', this.userPhoneCtrl);     
  }

  register() {

    const usr_login = this.registerForm.value.usr_login;
    const usr_password = this.registerForm.value.usr_password;
    const usr_name = this.registerForm.value.usr_name;
    const usr_surname = this.registerForm.value.usr_surname;
    const usr_email = this.registerForm.value.usr_email;
    const usr_phone = this.registerForm.value.usr_phone;
  
  
    if(usr_login && usr_login.length>0 && 
      usr_password && usr_password.length>0 && 
      usr_name && usr_name.length>0 &&
      usr_surname && usr_surname.length>0 &&
      usr_email && usr_email.length>0){
        
        
        this.insertUser(this.userRole);
        
    }
  }


  insertUser(userRole: string){


    const data = {
      "USR_LOGIN": this.registerForm.value.usr_login,
      "USR_PASSWORD": this.registerForm.value.usr_password,
      "USR_NAME": this.registerForm.value.usr_name,
      "USR_SURNAME": this.registerForm.value.usr_surname,
      "USR_EMAIL": this.registerForm.value.usr_email,
      "USR_PHONE": this.registerForm.value.usr_phone,
    }

    const conf = this.service.getDefaultServiceConfiguration('users');
    this.service.configureService(conf);
    this.service.insert(data, "clientRole")
      .subscribe((resp) => {
        if (resp.code === 0) {
          this.router.navigate([this.redirect]);
        }
      })
  }

}
