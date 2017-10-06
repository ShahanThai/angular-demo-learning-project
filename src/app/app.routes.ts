/**
 * Created by ShahanThai on 02/10/2017.
 */

import { Routes, RouterModule} from '@angular/router';

import { EmployeeListComponent } from './employee-list.component';
import { AddEmployeeComponent} from'./add-employee.component';
import { EditEmployeeComponent} from'./edit-employee.component';

const routes: Routes = [
    {
        path: 'list',
        component: EmployeeListComponent
    },
    {
        path: 'add',
        component: AddEmployeeComponent
    },
    {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'
    },
    {
        path: 'employee/:id',
        component: EditEmployeeComponent
    },
];

export const routing =  RouterModule.forRoot(routes);

