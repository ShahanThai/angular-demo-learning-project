import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from './ngb-date-custom-parser-formatter';


@Component({
  selector: 'my-app',
  template: `
      <h1>{{tittle}}</h1>
      <router-outlet></router-outlet>
  `,
  providers: [EmployeeService, {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}],
})
export class AppComponent  {
  ttile = 'Agular Demo';
}
