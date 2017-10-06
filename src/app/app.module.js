"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var table_1 = require("@angular/cdk/table");
var animations_1 = require("@angular/platform-browser/animations");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var material_1 = require("@angular/material");
var app_routes_1 = require("./app.routes");
var app_component_1 = require("./app.component");
var employee_list_component_1 = require("./employee-list.component");
var add_employee_component_1 = require("./add-employee.component");
var edit_employee_component_1 = require("./edit-employee.component");
var task_detail_component_1 = require("./task-detail.component");
var file_uploader_component_1 = require("./file-uploader.component");
var PlunkerMaterialModule = (function () {
    function PlunkerMaterialModule() {
    }
    PlunkerMaterialModule = __decorate([
        core_1.NgModule({
            exports: [
                table_1.CdkTableModule,
                material_1.MdGridListModule,
                material_1.MdListModule,
                material_1.MdPaginatorModule,
                material_1.MdSortModule,
                material_1.MdTableModule,
            ]
        })
    ], PlunkerMaterialModule);
    return PlunkerMaterialModule;
}());
exports.PlunkerMaterialModule = PlunkerMaterialModule;
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, animations_1.BrowserAnimationsModule, app_routes_1.routing, forms_1.FormsModule, http_1.HttpModule, PlunkerMaterialModule, ng_bootstrap_1.NgbModule.forRoot()],
            declarations: [app_component_1.AppComponent, employee_list_component_1.EmployeeListComponent, add_employee_component_1.AddEmployeeComponent, edit_employee_component_1.EditEmployeeComponent, task_detail_component_1.TaskDetailComponent, file_uploader_component_1.FileUploaderComponent],
            entryComponents: [
                task_detail_component_1.TaskDetailComponent,
            ],
            bootstrap: [app_component_1.AppComponent],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map