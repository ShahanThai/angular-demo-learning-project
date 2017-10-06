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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ngb_date_custom_parser_formatter_1 = require("./ngb-date-custom-parser-formatter");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/operator/map");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/observable/fromEvent");
var employee_service_1 = require("./employee.service");
var app_seting_1 = require("./app-seting");
var TaskDetailComponent = (function () {
    function TaskDetailComponent(_employeeService, activeModal, config) {
        this._employeeService = _employeeService;
        this.activeModal = activeModal;
        this.startDate = {
            date: null,
            time: { hour: 0, minute: 0, second: 0 }
        };
        this.endDate = {
            date: null,
            time: { hour: 0, minute: 0, second: 0 }
        };
        this.validation = {
            startDate: false,
            endDate: false,
            diff: false
        };
        this.formSubmitted = false;
        this.serverError = false;
        this.imageSrcs = [];
        config.spinners = false;
        config.seconds = true;
    }
    ;
    TaskDetailComponent.prototype.ngOnInit = function () {
        if (this.editTask.id !== -1) {
            var start = new Date(this.editTask.start);
            var end = new Date(this.editTask.end);
            this.startDate = toDateTime(start);
            this.endDate = toDateTime(end);
        }
        for (var _i = 0, _a = this.editTask.imgUrls; _i < _a.length; _i++) {
            var imgURL = _a[_i];
            this.imageSrcs.push({
                src: app_seting_1.AppSettings.BASE_URL + imgURL,
                file: null,
                loaded: true,
                type: 1
            });
        }
    };
    ;
    TaskDetailComponent.prototype.ngAfterViewInit = function () {
    };
    TaskDetailComponent.prototype.ngOnDestroy = function () {
    };
    ;
    TaskDetailComponent.prototype.updateTask = function () {
        var _this = this;
        this.serverError = false;
        this.formSubmitted = true;
        this.validation = {
            startDate: false,
            endDate: false,
            diff: true
        };
        if (this.startDate && this.startDate.date && this.startDate.time) {
            this.validation.startDate = true;
        }
        if (this.endDate && this.endDate.date && this.endDate.time) {
            this.validation.endDate = true;
        }
        if (!this.validation.startDate || !this.validation.endDate) {
            return;
        }
        var startString = '' + this.startDate.date.year + '/' + this.startDate.date.month + '/' + this.startDate.date.day
            + ' ' + this.startDate.time.hour + ':' + this.startDate.time.minute + ':' + this.startDate.time.second;
        var endString = '' + this.endDate.date.year + '/' + this.endDate.date.month + '/' + this.endDate.date.day
            + ' ' + this.endDate.time.hour + ':' + this.endDate.time.minute + ':' + this.endDate.time.second;
        var start = new Date(startString);
        var end = new Date(endString);
        if ((end.valueOf() - start.valueOf()) <= 0) {
            this.validation.diff = false;
            return;
        }
        this.editTask.start = start.toISOString();
        this.editTask.end = end.toISOString();
        if (this.editTask.id === -1) {
            this._employeeService.addTask(this.employeeID, this.editTask, this.imageSrcs)
                .map(function (response) {
                return response.json();
            })
                .subscribe(function (p) {
                _this.afterUpdate(p);
            }, function (error) {
                _this.serverError = true;
            });
        }
        else {
            this._employeeService.updateTask(this.employeeID, this.editTask, this.imageSrcs)
                .map(function (response) {
                return response.json();
            })
                .subscribe(function (p) {
                _this.afterUpdate(p);
            }, function (error) {
                _this.serverError = true;
            });
        }
    };
    ;
    TaskDetailComponent.prototype.afterUpdate = function (p) {
        if (p.error_code === 0) {
            this.activeModal.close();
        }
        else {
            this.serverError = true;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TaskDetailComponent.prototype, "employeeID", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TaskDetailComponent.prototype, "editTask", void 0);
    TaskDetailComponent = __decorate([
        core_1.Component({
            selector: 'task-detail',
            styleUrls: [
                '../../styles/employee.css'
            ],
            encapsulation: core_1.ViewEncapsulation.None,
            templateUrl: 'app/task-detail.component.html',
            providers: [employee_service_1.EmployeeService, { provide: ng_bootstrap_1.NgbDateParserFormatter, useClass: ngb_date_custom_parser_formatter_1.NgbDateCustomParserFormatter }]
        }),
        __metadata("design:paramtypes", [employee_service_1.EmployeeService, ng_bootstrap_1.NgbActiveModal, ng_bootstrap_1.NgbTimepickerConfig])
    ], TaskDetailComponent);
    return TaskDetailComponent;
}());
exports.TaskDetailComponent = TaskDetailComponent;
function toDateTime(date) {
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
//# sourceMappingURL=task-detail.component.js.map