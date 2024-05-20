import { Component, Injector, OnInit } from '@angular/core';
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

  service: OntimizeService;
  redirect = '/main';
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
  }

  register() {

    const usr_login = this.registerForm.value.usr_login;
    const usr_password = this.registerForm.value.usr_password;
    const usr_name = this.registerForm.value.usr_name;
    const usr_surname = this.registerForm.value.usr_surname;
    const usr_email = this.registerForm.value.usr_email;

    console.log("inside register");
    console.log(usr_login);
    console.log(usr_password);
    console.log(usr_name);
    console.log(usr_surname);
    console.log(usr_email);
    
    
    if(usr_login && usr_login.length>0 && 
      usr_password && usr_password.length>0 && 
      usr_name && usr_name.length>0 &&
      usr_surname && usr_surname.length>0 &&
      usr_email && usr_email.length>0){
        
        console.log("inside register IF");
        this.insertUser(this.userRole);
        
    }
  }


  insertUser(userRole: string){


    console.log("inside insertUser");
    const data = {
      "USR_LOGIN": this.registerForm.value.usr_login,
      "USR_PASSWORD": this.registerForm.value.usr_password,
      "USR_NAME": this.registerForm.value.usr_name,
      "USR_SURNAME": this.registerForm.value.usr_surname,
      "USR_EMAIL": this.registerForm.value.usr_email,
      "ROL_NAME" : userRole
    }

    console.log(data);

    const conf = this.service.getDefaultServiceConfiguration('users');
    this.service.configureService(conf);
    this.service.insert(data, "userRoles")
      .subscribe((resp) => {
        console.log(resp);
        if (resp.code === 0) {
          this.router.navigate([this.redirect]);
        }
      })
  }

}
