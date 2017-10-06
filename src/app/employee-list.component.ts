/**
 * Created by ShahanThai on 02/10/2017.
 */
import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MdPaginator} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';


import { Employee} from './employee';
import { EmployeeService } from './employee.service';

@Component({
    selector: 'employees-list',
    styleUrls: [
        '../../styles/table.css'
    ],
    templateUrl: 'app/employee-list.component.html'
})

export class EmployeeListComponent implements OnInit {
    displayedColumns = ['id', 'name', 'email', 'phone', 'position', 'status', 'action'];
    employeeDatabase: EmployeeDatabase;
    employees: Employee[];
    dataSource: EmployeeDataSource | null;

    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MdPaginator) paginator: MdPaginator;
    // paginator: {
    //     pageSize: number;
    //     pageIndex: any;
    // } = {
    //     pageSize: 2,
    //     pageIndex: 1,
    // };
    constructor(private _employeeService: EmployeeService) {
        this.employeeDatabase = new EmployeeDatabase(this._employeeService);
    };

    ngOnInit() {
        // this._employeeService.getAll().subscribe(p => this.employees = p);
        this.dataSource = new EmployeeDataSource(this.employeeDatabase, this.paginator);
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) { return; }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }
}

export class EmployeeDatabase {
    dataChange: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
    get data(): Employee[] {
        return this.dataChange.value;
    };
    constructor(private _employeeService: EmployeeService) {
        this._employeeService.getAll().subscribe(p => {
            for (let employee of p) {
                const copiedData = this.data.slice();
                copiedData.push(employee);
                this.dataChange.next(copiedData);
            }
        });
    };
}

export class EmployeeDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }

    filteredData: Employee[] = [];
    renderedData: Employee[] = [];

    constructor(private _employeesList: EmployeeDatabase, private _paginator: any) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Employee[]> {
        const displayDataChanges = [
            this._employeesList.dataChange,
            this._filterChange,
            this._paginator.page,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            const startIndex = (this._paginator.pageIndex) * this._paginator.pageSize;


            this.filteredData = this._employeesList.data.slice().filter((item: Employee) => {
                let searchStr = item.name.toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });

            this.renderedData = this.filteredData.slice().splice(startIndex, this._paginator.pageSize);

            return this.renderedData;
        });
    }

    disconnect() {}
}



