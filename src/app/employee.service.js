"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var app_seting_1 = require("./app-seting");
var EmployeeService = (function () {
    function EmployeeService(http) {
        this.http = http;
        this.getListAPIURL = app_seting_1.AppSettings.BASE_URL + 'get-list.php';
        this.getByIDAPIURL = app_seting_1.AppSettings.BASE_URL + 'get-employee-by-id.php';
        this.addAPIURL = app_seting_1.AppSettings.BASE_URL + 'add.php';
        this.addTaskAPIURL = app_seting_1.AppSettings.BASE_URL + 'add-task.php';
        this.updateAPIURL = app_seting_1.AppSettings.BASE_URL + 'update.php';
        this.updateTaskAPIURL = app_seting_1.AppSettings.BASE_URL + 'update-task.php';
    }
    ;
    EmployeeService.prototype.getAll = function () {
        var employee$ = this.http
            .get(this.getListAPIURL, { headers: this.getHeaders() })
            .map(mapEmployees);
        return employee$;
    };
    ;
    EmployeeService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        return headers;
    };
    ;
    EmployeeService.prototype.save = function (employee) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        return this.http
            .post(this.addAPIURL, employee, { headers: headers });
    };
    ;
    EmployeeService.prototype.get = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('id', id.toString());
        var employee$ = this.http
            .get(this.getByIDAPIURL, { headers: this.getHeaders(), search: params })
            .map(function (response) {
            return response.json();
        });
        return employee$;
    };
    ;
    EmployeeService.prototype.update = function (employee) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        return this.http
            .post(this.updateAPIURL, employee, { headers: headers });
    };
    ;
    EmployeeService.prototype.addTask = function (employeeID, task, imgSrcs) {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        var formData = new FormData();
        formData.append('employeeID', employeeID.toString());
        formData.append('task', JSON.stringify(task));
        var formatImgSources = [];
        imgSrcs.forEach(function (item, index) {
            var name = '';
            var src = item.src;
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
            .post(this.addTaskAPIURL, formData, { headers: headers });
    };
    ;
    EmployeeService.prototype.updateTask = function (employeeID, task, imgSrcs) {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        var formData = new FormData();
        formData.append('employeeID', employeeID.toString());
        formData.append('task', JSON.stringify(task));
        var formatImgSources = [];
        imgSrcs.forEach(function (item, index) {
            var name = '';
            var src = item.src;
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
            .post(this.updateTaskAPIURL, formData, { headers: headers });
    };
    ;
    EmployeeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], EmployeeService);
    return EmployeeService;
}());
exports.EmployeeService = EmployeeService;
function mapEmployees(response) {
    return response.json().result.map(toEmployee);
}
function toEmployee(r) {
    var employee = ({
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
//# sourceMappingURL=employee.service.js.map