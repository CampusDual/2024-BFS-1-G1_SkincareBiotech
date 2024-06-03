import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ORealInputComponent, OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-commission-detail',
  templateUrl: './commission-detail.component.html',
  styleUrls: ['./commission-detail.component.css']
})
export class CommissionDetailComponent implements OnInit {

  @ViewChild("comValue")
  comValue: ORealInputComponent;

  service: OntimizeService;

  constructor(
    private router: Router,
    protected injector: Injector
  ) {
    this.service = this.injector.get(OntimizeService);
   }

  ngOnInit() {
  }

  onUpdate(success: boolean) {
    if (success) {
      this.router.navigate(['/admin/commissions']);
    } 
  }

}
