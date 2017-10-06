/**
 * Created by ShahanThai on 03/10/2017.
 */

/**
 * Created by ShahanThai on 02/10/2017.
 */
import { Task } from './task';

import { Employee } from './employee';

export class EmployeeValidation {
    name: boolean = true;
    email: boolean  = true;
    phone: boolean  = true;
    position: boolean  = true;
    status: boolean  = true;
    isValid: boolean  = true;
    tasks: Task[];
    constructor(private _employee: Employee) {
        this.validate();
    };
    validate() {
        if (!validatePhoneNumber(this._employee.phone)) {
            this.isValid = false;
            this.phone = false;
        }
        if (!validateEmail(this._employee.email)) {
            this.isValid = false;
            this.email = false;
        }
    };
}

function validatePhoneNumber(phone: any): boolean {
    if (!phone) {
        return false;
    }
    if (phone.length < 9) {
        return false;
    }
    if (isNaN(phone)) {
        return false;
    }
    if (phone % 1 !== 0) {
        return false;
    }
    if (phone < 0) {
        return false;
    }
    return true;
};

function validateEmail(email: any): boolean {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!email) {
        return false;
    }
    if (!filter.test(email)) {
        return false;
    }
    return true;
}

