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
var router_1 = require("@angular/router");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/operator/map");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/observable/fromEvent");
var employee_service_1 = require("./employee.service");
var employee_validation_1 = require("./employee-validation");
var AddEmployeeComponent = (function () {
    function AddEmployeeComponent(_employeeService, router) {
        this._employeeService = _employeeService;
        this.router = router;
        this._opened = false;
        this.employee = {
            id: 0,
            name: '',
            email: '',
            phone: '',
            position: 'Dev',
            status: true,
            tasks: []
        };
        this.formSubmitted = false;
        this.serverError = false;
        this.professions = ['Dev', 'Manager', 'HR', 'Leader', 'Project Manager'];
    }
    ;
    AddEmployeeComponent.prototype.ngOnInit = function () {
        this._opened = true;
    };
    ;
    AddEmployeeComponent.prototype.saveBasicInformation = function () {
        var _this = this;
        this.formSubmitted = true;
        this.serverError = false;
        this.validation = new employee_validation_1.EmployeeValidation(this.employee);
        if (!this.validation.isValid) {
            return;
        }
        this._employeeService.save(this.employee)
            .map(function (response) {
            return response.json();
        })
            .subscribe(function (p) {
            if (p.error_code === 0) {
                _this.router.navigate(['/employee', p.data], { queryParams: { tab: 2 } });
            }
            else {
                _this.serverError = true;
            }
        });
    };
    AddEmployeeComponent = __decorate([
        core_1.Component({
            selector: 'add-employee',
            styleUrls: [
                '../../styles/employee.css'
            ],
            encapsulation: core_1.ViewEncapsulation.None,
            templateUrl: 'app/add-employee.component.html'
        }),
        __metadata("design:paramtypes", [employee_service_1.EmployeeService, router_1.Router])
    ], AddEmployeeComponent);
    return AddEmployeeComponent;
}());
exports.AddEmployeeComponent = AddEmployeeComponent;
//# sourceMappingURL=add-employee.component.js.map