/**
 * Created by ShahanThai on 02/10/2017.
 */

import { Injectable } from '@angular/core';
import { Employee} from './employee';
import { Task } from './task';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppSettings }  from './app-seting';

@Injectable()
export class EmployeeService {

    getListAPIURL = AppSettings.BASE_URL + 'get-list.php';
    getByIDAPIURL = AppSettings.BASE_URL + 'get-employee-by-id.php';
    addAPIURL = AppSettings.BASE_URL + 'add.php';
    addTaskAPIURL = AppSettings.BASE_URL + 'add-task.php';
    updateAPIURL = AppSettings.BASE_URL + 'update.php';
    updateTaskAPIURL = AppSettings.BASE_URL + 'update-task.php';
    constructor(private http: Http) {

    };
    getAll(): Observable<Employee[]> {
        let employee$ = this.http
            .get(this.getListAPIURL, {headers: this.getHeaders()})
            .map(mapEmployees);
        return employee$;
    };

    private getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    };
    save(employee: Employee): any {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        return this.http
            .post(this.addAPIURL, employee, {headers: headers});
    };
    get(id: number): Observable<Employee> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id.toString());
        let employee$ = this.http
            .get(this.getByIDAPIURL, {headers: this.getHeaders(), search: params})
            .map((response: Response) => {
                return response.json();
            });
        return employee$;
    };
    update(employee: Employee): any {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        return this.http
            .post(this.updateAPIURL, employee, {headers: headers});
    };
    addTask(employeeID: number, task: Task, imgSrcs: any): any {
        let headers = new Headers();
        // headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        // let body = {
        //     employeeID: employeeID,
        //     task: task
        // };
        let formData = new FormData();
        formData.append('employeeID', employeeID.toString());
        formData.append('task', JSON.stringify(task));
        let formatImgSources: any[] = [];

        imgSrcs.forEach((item: any, index: number) => {
            let name = '';
            let src = item.src;
            if (item.type === 3) {
                formData.append('fileUpload' + index, item.file);
                name = item.file.name;
                src = '';
            }
            formatImgSources.push({
                type: item.type,
                src: src,
                name: name
            });
        });
        formData.append('imgSrcs', JSON.stringify(formatImgSources));
        return this.http
            .post(this.addTaskAPIURL, formData, {headers: headers});
    };
    updateTask(employeeID: number, task: any, imgSrcs: any): any {
        let headers = new Headers();
        // headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        // let body = {
        //     employeeID: employeeID,
        //     task: task
        // };
        let formData = new FormData();
        formData.append('employeeID', employeeID.toString());
        formData.append('task', JSON.stringify(task));
        let formatImgSources: any[] = [];

        imgSrcs.forEach((item: any, index: number) => {
            let name = '';
            let src = item.src;
            if (item.type === 3) {
                formData.append('fileUpload' + index, item.file);
                name = item.file.name;
                src = '';
            }
            formatImgSources.push({
                type: item.type,
                src: src,
                name: name
            });
        });
        formData.append('imgSrcs', JSON.stringify(formatImgSources));
        return this.http
            .post(this.updateTaskAPIURL, formData, {headers: headers});
    };
}

function mapEmployees(response: Response): Employee[] {
    return response.json().result.map(toEmployee);
}

function toEmployee(r: any) {
    let employee = <Employee>({
        id: r.id,
        name: r.name,
        email: r.email,
        phone: r.phone,
        position: r.position,
        status: r.status,
        tasks: r.tasks
    });
    return employee;
}