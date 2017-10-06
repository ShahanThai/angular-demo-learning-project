/**
 * Created by ShahanThai on 02/10/2017.
 */
import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';


import { Employee} from './employee';
import { EmployeeService } from './employee.service';
import { EmployeeValidation } from './employee-validation'
import { Task } from './task'

@Component({
    selector: 'add-employee',
    styleUrls: [
        '../../styles/employee.css'
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'app/add-employee.component.html'
})

export class AddEmployeeComponent implements OnInit {
    private _opened: boolean = false;
    employee: Employee = {
        id: 0,
        name: '',
        email: '',
        phone: '',
        position: 'Dev',
        status: true,
        tasks: []
    };
    validation: EmployeeValidation;
    formSubmitted: boolean = false;
    serverError: boolean = false;
    professions: string[] = ['Dev', 'Manager', 'HR', 'Leader', 'Project Manager'];

    constructor(private _employeeService: EmployeeService, private router: Router ) {

    };

    ngOnInit() {
        this._opened = true;
    };

    saveBasicInformation() {
        this.formSubmitted = true;
        this.serverError = false;
        this.validation = new EmployeeValidation(this.employee);
        if (!this.validation.isValid) {
            return;
        }
        this._employeeService.save(this.employee)
            .map((response: any) => {
                return response.json();
            })
            .subscribe((p: any) => {
                if (p.error_code === 0) {
                    this.router.navigate(['/employee', p.data], { queryParams: { tab: 2 } });
                } else {
                    this.serverError = true;
                }
            });
    }
}



