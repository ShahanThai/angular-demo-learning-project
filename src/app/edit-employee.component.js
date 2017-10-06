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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/operator/map");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/observable/fromEvent");
var employee_service_1 = require("./employee.service");
var employee_validation_1 = require("./employee-validation");
var task_detail_component_1 = require("./task-detail.component");
var EditEmployeeComponent = (function () {
    function EditEmployeeComponent(_employeeService, route, router, modalService, config) {
        this._employeeService = _employeeService;
        this.route = route;
        this.router = router;
        this.modalService = modalService;
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
        this.editTask = {
            id: -1,
            name: '',
            start: undefined,
            end: undefined,
            description: '',
            imgUrls: []
        };
        this.startDate = {
            date: null,
            time: { hour: 0, minute: 0, second: 0 }
        };
        this.endDate = {
            date: null,
            time: { hour: 0, minute: 0, second: 0 }
        };
        this.formSubmitted = false;
        this.serverError = false;
        this.updateStatus = false;
        this.professions = ['Dev', 'Manager', 'HR', 'Leader', 'Project Manager'];
        config.spinners = false;
        config.seconds = true;
    }
    EditEmployeeComponent.prototype._toggleSidebar = function () {
        this._opened = !this._opened;
    };
    ;
    EditEmployeeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._opened = true;
        this.sub = this.route.params.subscribe(function (params) {
            var id = Number.parseInt(params['id']);
            _this._employeeService
                .get(id)
                .subscribe(function (p) {
                if (p.error_code !== 0) {
                    _this.router.navigate(['/list']);
                }
                else {
                    _this.employee = p.result;
                }
            });
        });
        this.subQueryParams = this.route.queryParams
            .subscribe(function (params) {
            if (params['tab'] && params['tab'] == 2) {
                $('#v-pills-profile-tab').click();
            }
        });
    };
    ;
    EditEmployeeComponent.prototype.ngAfterViewInit = function () {
        $(".modal-content").on('shown', function () {
            $('#uploadChoice').select2({
                placeholder: 'Select upload option',
                width: '100%',
                data: [
                    { id: 0, text: 'From file' },
                    { id: 0, text: 'From link' }
                ]
            });
        });
        $('#uploadChoice').select2({
            placeholder: 'Select upload option',
            width: '100%',
            data: [
                { id: 0, text: 'From file' },
                { id: 0, text: 'From link' }
            ]
        });
    };
    EditEmployeeComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
        this.subQueryParams.unsubscribe();
    };
    ;
    EditEmployeeComponent.prototype.open = function (method, id) {
        var _this = this;
        if (method === 'add') {
            this.editTask = {
                id: -1,
                name: '',
                start: undefined,
                end: undefined,
                description: '',
                imgUrls: []
            };
        }
        else {
            this.editTask = this.employee.tasks.find(function (p) { return id === p.id; });
        }
        var modalRef = this.modalService.open(task_detail_component_1.TaskDetailComponent, {
            size: 'lg',
            backdrop: 'static'
        });
        modalRef.componentInstance.editTask = JSON.parse(JSON.stringify(this.editTask));
        modalRef.componentInstance.employeeID = this.employee.id;
        modalRef.result.then(function (result) {
            _this._employeeService
                .get(_this.employee.id)
                .subscribe(function (e) {
                _this.employee = e.result;
            });
        }, function (reason) {
        });
    };
    EditEmployeeComponent.prototype.updateBasicInformation = function () {
        var _this = this;
        this.formSubmitted = true;
        this.updateStatus = false;
        this.validation = new employee_validation_1.EmployeeValidation(this.employee);
        if (!this.validation.isValid) {
            return;
        }
        this._employeeService.update(this.employee)
            .map(function (response) {
            return response.json();
        })
            .subscribe(function (p) {
            if (p.error_code === 0) {
                _this.updateStatus = true;
            }
            else {
                _this.serverError = true;
            }
        });
    };
    ;
    EditEmployeeComponent.prototype.backToInformation = function () {
        $('#v-pills-home-tab').click();
    };
    EditEmployeeComponent = __decorate([
        core_1.Component({
            selector: 'edit-employee',
            styleUrls: [
                '../../styles/employee.css'
            ],
            encapsulation: core_1.ViewEncapsulation.None,
            templateUrl: 'app/edit-employee.component.html'
        }),
        __metadata("design:paramtypes", [employee_service_1.EmployeeService, router_1.ActivatedRoute, router_1.Router,
            ng_bootstrap_1.NgbModal, ng_bootstrap_1.NgbTimepickerConfig])
    ], EditEmployeeComponent);
    return EditEmployeeComponent;
}());
exports.EditEmployeeComponent = EditEmployeeComponent;
//# sourceMappingURL=edit-employee.component.js.map