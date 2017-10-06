/**
 * Created by ShahanThai on 03/10/2017.
 */

import { Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbTimepickerConfig, NgbDateStruct, NgbTimeStruct, NgbActiveModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from './ngb-date-custom-parser-formatter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';


import { Employee} from './employee';
import { EmployeeService } from './employee.service';
import { EmployeeValidation } from './employee-validation';
import { AppSettings } from './app-seting';
import { Task } from './task';

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'task-detail',
    styleUrls: [
        '../../styles/employee.css'
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'app/task-detail.component.html',
    providers: [EmployeeService, {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}]
})

export class TaskDetailComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() employeeID: number;
    @Input() editTask: Task;
    startDate: any = {
        date: null,
        time: {hour: 0, minute: 0, second: 0}
    };
    endDate: any = {
        date: null,
        time: {hour: 0, minute: 0, second: 0}
    };
    uploadImageChoice: string;
    validation: any = {
        startDate: false,
        endDate: false,
        diff: false
    };
    formSubmitted: boolean = false;
    serverError: boolean = false;
    imageSrcs: any[] = [];

    constructor(private _employeeService: EmployeeService,  public activeModal: NgbActiveModal, config: NgbTimepickerConfig) {
        config.spinners = false;
        config.seconds = true;
    };

    ngOnInit() {
        if (this.editTask.id !== -1) {
            let start = new Date(this.editTask.start);
            let end = new Date(this.editTask.end);
            this.startDate = toDateTime(start);
            this.endDate = toDateTime(end);
        }
        for (let imgURL of this.editTask.imgUrls) {
            this.imageSrcs.push({
                src: AppSettings.BASE_URL + imgURL,
                file: null,
                loaded: true,
                type: 1
            });
        }
    };

    ngAfterViewInit() {
        // $('#uploadChoice').select2({
        //     placeholder: 'Select upload option',
        //     width: '100%',
        //     allowClear: true,
        //     data: [
        //         {id: 1, text: 'From file'},
        //         {id: 2, text: 'From link'}
        //     ]
        // });
        // $('#uploadChoice').select2('val', null);
        // $('#uploadChoice').on('change',
        //     (e: any) => {
        //         this.uploadImageChoice = $(e.target).val();
        //         console.log(this.uploadImageChoice);
        //     }
        // );
    }

    ngOnDestroy() {

    };

    updateTask() {
        this.serverError = false;
        this.formSubmitted = true;
        this.validation = {
            startDate: false,
            endDate: false,
            diff: true
        }
        if (this.startDate && this.startDate.date && this.startDate.time) {
            this.validation.startDate = true;
        }
        if (this.endDate && this.endDate.date && this.endDate.time) {
            this.validation.endDate = true;
        }
        if (!this.validation.startDate || !this.validation.endDate) {
            return;
        }
        let startString =  '' + this.startDate.date.year + '/' + this.startDate.date.month + '/' + this.startDate.date.day
            + ' '  + this.startDate.time.hour + ':' + this.startDate.time.minute + ':' + this.startDate.time.second;
        let endString =  '' + this.endDate.date.year + '/' + this.endDate.date.month + '/' + this.endDate.date.day
            + ' ' + this.endDate.time.hour + ':' + this.endDate.time.minute + ':' + this.endDate.time.second;
        let start = new Date(startString);
        let end = new Date(endString);
        if ((end.valueOf() - start.valueOf()) <= 0 ) {
            this.validation.diff = false;
            return;
        }
        this.editTask.start = start.toISOString();
        this.editTask.end = end.toISOString();
        // this.editTask.newImageSrcs = this.imageSrcs;

        if (this.editTask.id === -1) {
            this._employeeService.addTask(this.employeeID, this.editTask, this.imageSrcs)
                .map((response: any) => {
                    return response.json();
                })
                .subscribe((p: any) => {
                    this.afterUpdate(p);
                }, (error: any) => {
                    this.serverError = true;
                });
        } else {
            this._employeeService.updateTask(this.employeeID, this.editTask, this.imageSrcs)
                .map((response: any) => {
                    return response.json();
                })
                .subscribe((p: any) => {
                    this.afterUpdate(p);
                }, (error: any) => {
                    this.serverError = true;
                });
        }
    };
    private afterUpdate(p: any) {
        if (p.error_code === 0) {
            this.activeModal.close();
        } else {
            this.serverError = true;
        }
    }

}

function toDateTime(date: Date): any {
    return {
        date: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
        },
        time: {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
        }
    };
}



