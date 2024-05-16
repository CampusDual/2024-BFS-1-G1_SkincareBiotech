import { Component, OnInit } from '@angular/core';
import { AuthService, PermissionsService } from 'ontimize-web-ngx';
import { CustomPermissionsService } from 'src/app/shared/services/custom-permissions.service';
@Component({
  selector: 'app-public-component',
  templateUrl: './public-component.component.html',
  styleUrls: ['./public-component.component.scss']
})
export class PublicComponentComponent implements OnInit {
  isLoaded : boolean = false;
  isLogedIn : boolean = false;
  constructor(
    private permissionService: PermissionsService,
    private authService : AuthService
  ) { }

  ngOnInit() {
    this.isLogedIn = this.authService.isLoggedIn();
    this.loadPermissions();
  }
  loadPermissions(){
    this.permissionService.getUserPermissionsAsPromise().then(() =>{
      this.isLoaded = true;
    });
  }
  logout(){
    this.authService.clearSessionData();
    this.isLogedIn = false;
    this.isLoaded = false;
    this.loadPermissions();
  }
}
