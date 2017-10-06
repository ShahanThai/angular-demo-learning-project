"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var employee_list_component_1 = require("./employee-list.component");
var add_employee_component_1 = require("./add-employee.component");
var edit_employee_component_1 = require("./edit-employee.component");
var routes = [
    {
        path: 'list',
        component: employee_list_component_1.EmployeeListComponent
    },
    {
        path: 'add',
        component: add_employee_component_1.AddEmployeeComponent
    },
    {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'
    },
    {
        path: 'employee/:id',
        component: edit_employee_component_1.EditEmployeeComponent
    },
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map