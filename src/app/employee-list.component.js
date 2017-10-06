"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var collections_1 = require("@angular/cdk/collections");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var material_1 = require("@angular/material");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/operator/map");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/observable/fromEvent");
var employee_service_1 = require("./employee.service");
var EmployeeListComponent = (function () {
    function EmployeeListComponent(_employeeService) {
        this._employeeService = _employeeService;
        this.displayedColumns = ['id', 'name', 'email', 'phone', 'position', 'status', 'action'];
        this.employeeDatabase = new EmployeeDatabase(this._employeeService);
    }
    ;
    EmployeeListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new EmployeeDataSource(this.employeeDatabase, this.paginator);
        Observable_1.Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(function () {
            if (!_this.dataSource) {
                return;
            }
            _this.dataSource.filter = _this.filter.nativeElement.value;
        });
    };
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], EmployeeListComponent.prototype, "filter", void 0);
    __decorate([
        core_1.ViewChild(material_1.MdPaginator),
        __metadata("design:type", material_1.MdPaginator)
    ], EmployeeListComponent.prototype, "paginator", void 0);
    EmployeeListComponent = __decorate([
        core_1.Component({
            selector: 'employees-list',
            styleUrls: [
                '../../styles/table.css'
            ],
            templateUrl: 'app/employee-list.component.html'
        }),
        __metadata("design:paramtypes", [employee_service_1.EmployeeService])
    ], EmployeeListComponent);
    return EmployeeListComponent;
}());
exports.EmployeeListComponent = EmployeeListComponent;
var EmployeeDatabase = (function () {
    function EmployeeDatabase(_employeeService) {
        var _this = this;
        this._employeeService = _employeeService;
        this.dataChange = new BehaviorSubject_1.BehaviorSubject([]);
        this._employeeService.getAll().subscribe(function (p) {
            for (var _i = 0, p_1 = p; _i < p_1.length; _i++) {
                var employee = p_1[_i];
                var copiedData = _this.data.slice();
                copiedData.push(employee);
                _this.dataChange.next(copiedData);
            }
        });
    }
    Object.defineProperty(EmployeeDatabase.prototype, "data", {
        get: function () {
            return this.dataChange.value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return EmployeeDatabase;
}());
exports.EmployeeDatabase = EmployeeDatabase;
var EmployeeDataSource = (function (_super) {
    __extends(EmployeeDataSource, _super);
    function EmployeeDataSource(_employeesList, _paginator) {
        var _this = _super.call(this) || this;
        _this._employeesList = _employeesList;
        _this._paginator = _paginator;
        _this._filterChange = new BehaviorSubject_1.BehaviorSubject('');
        _this.filteredData = [];
        _this.renderedData = [];
        return _this;
    }
    Object.defineProperty(EmployeeDataSource.prototype, "filter", {
        get: function () { return this._filterChange.value; },
        set: function (filter) { this._filterChange.next(filter); },
        enumerable: true,
        configurable: true
    });
    EmployeeDataSource.prototype.connect = function () {
        var _this = this;
        var displayDataChanges = [
            this._employeesList.dataChange,
            this._filterChange,
            this._paginator.page,
        ];
        return Observable_1.Observable.merge.apply(Observable_1.Observable, displayDataChanges).map(function () {
            var startIndex = (_this._paginator.pageIndex) * _this._paginator.pageSize;
            _this.filteredData = _this._employeesList.data.slice().filter(function (item) {
                var searchStr = item.name.toLowerCase();
                return searchStr.indexOf(_this.filter.toLowerCase()) !== -1;
            });
            _this.renderedData = _this.filteredData.slice().splice(startIndex, _this._paginator.pageSize);
            return _this.renderedData;
        });
    };
    EmployeeDataSource.prototype.disconnect = function () { };
    return EmployeeDataSource;
}(collections_1.DataSource));
exports.EmployeeDataSource = EmployeeDataSource;
//# sourceMappingURL=employee-list.component.js.map