/**
 * Created by ShahanThai on 03/10/2017.
 */

import { Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbTimepickerConfig, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';


import { Employee} from './employee';
import { EmployeeService } from './employee.service';
import { EmployeeValidation } from './employee-validation';
import { Task } from './task';
import { TaskDetailComponent } from './task-detail.component';

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'edit-employee',
    styleUrls: [
        '../../styles/employee.css'
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'app/edit-employee.component.html'
})

export class EditEmployeeComponent implements OnInit, OnDestroy, AfterViewInit {
    private _opened: boolean = false;
    sub: any;
    subQueryParams: any;
    employee: Employee = {
        id: 0,
        name: '',
        email: '',
        phone: '',
        position: 'Dev',
        status: true,
        tasks: []
    };
    editTask: Task = {
        id: -1,
        name: '',
        start: undefined,
        end: undefined,
        description: '',
        imgUrls: []
    };

    startDate: any = {
        date: null,
        time: {hour: 0, minute: 0, second: 0}
    };
    endDate: any = {
        date: null,
        time: {hour: 0, minute: 0, second: 0}
    };
    uploadImageChoice: string;
    validation: EmployeeValidation;
    formSubmitted: boolean = false;
    serverError: boolean = false;
    updateStatus: boolean = false;
    professions: string[] = ['Dev', 'Manager', 'HR', 'Leader', 'Project Manager'];

    private _toggleSidebar() {
        this._opened = !this._opened;
    }

    constructor(private _employeeService: EmployeeService,  private route: ActivatedRoute, private router: Router,
                private modalService: NgbModal, config: NgbTimepickerConfig) {
        config.spinners = false;
        config.seconds = true;
    };

    ngOnInit() {
        this._opened = true;

        this.sub = this.route.params.subscribe(params => {
            let id = Number.parseInt(params['id']);
            this._employeeService
                .get(id)
                .subscribe((p: any) =>  {
                    if (p.error_code !== 0) {
                        this.router.navigate(['/list']);
                    } else {
                        this.employee = p.result;
                    }
                });
        });

        this.subQueryParams = this.route.queryParams
            .subscribe(params => {
                if (params['tab'] && params['tab'] == 2) {
                    $('#v-pills-profile-tab').click();
                }
            });

    };

    ngAfterViewInit() {
        $(".modal-content").on('shown', function(){
            $('#uploadChoice').select2({
                placeholder: 'Select upload option',
                width: '100%',
                data: [
                    {id: 0, text: 'From file'},
                    {id: 0, text: 'From link'}
                ]
            });
        });
        $('#uploadChoice').select2({
            placeholder: 'Select upload option',
            width: '100%',
            data: [
                {id: 0, text: 'From file'},
                {id: 0, text: 'From link'}
            ]
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.subQueryParams.unsubscribe();
    };

    open(method: string, id: number) {
        if (method === 'add') {
            this.editTask = {
                id: -1,
                name: '',
                start: undefined,
                end: undefined,
                description: '',
                imgUrls: []
            };
        } else {
            this.editTask = this.employee.tasks.find((p: Task) => id === p.id);
        }
        const modalRef = this.modalService.open(TaskDetailComponent, {
            size: 'lg',
            backdrop: 'static'
        })
        modalRef.componentInstance.editTask = JSON.parse(JSON.stringify(this.editTask));
        modalRef.componentInstance.employeeID = this.employee.id;
        modalRef.result.then((result) => {
            this._employeeService
                .get(this.employee.id)
                .subscribe((e: any) => {
                    this.employee = e.result;
                });
        }, (reason) => {

        });
    }

    updateBasicInformation() {
        this.formSubmitted = true;
        this.updateStatus = false;
        this.validation = new EmployeeValidation(this.employee);
        if (!this.validation.isValid) {
            return;
        }
        this._employeeService.update(this.employee)
            .map((response: any) => {
                return response.json();
            })
            .subscribe((p: any) => {
                if (p.error_code === 0) {
                    this.updateStatus = true;
                } else {
                    this.serverError = true;
                }
            });
    };

    backToInformation() {
        $('#v-pills-home-tab').click();
    }
}


