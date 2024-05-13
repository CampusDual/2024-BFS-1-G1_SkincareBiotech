import { Component, OnInit } from '@angular/core';
import { CustomPermissionsService } from 'src/app/shared/services/custom-permissions.service';

@Component({
  selector: 'app-public-component',
  templateUrl: './public-component.component.html',
  styleUrls: ['./public-component.component.scss']
})
export class PublicComponentComponent implements OnInit {

  constructor(
    private permissionService: CustomPermissionsService,
  ) { }

  ngOnInit() {
    this.permissionService.loadPermissions().subscribe();
  }

}
