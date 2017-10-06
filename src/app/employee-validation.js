"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmployeeValidation = (function () {
    function EmployeeValidation(_employee) {
        this._employee = _employee;
        this.name = true;
        this.email = true;
        this.phone = true;
        this.position = true;
        this.status = true;
        this.isValid = true;
        this.validate();
    }
    ;
    EmployeeValidation.prototype.validate = function () {
        if (!validatePhoneNumber(this._employee.phone)) {
            this.isValid = false;
            this.phone = false;
        }
        if (!validateEmail(this._employee.email)) {
            this.isValid = false;
            this.email = false;
        }
    };
    ;
    return EmployeeValidation;
}());
exports.EmployeeValidation = EmployeeValidation;
function validatePhoneNumber(phone) {
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
}
;
function validateEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!email) {
        return false;
    }
    if (!filter.test(email)) {
        return false;
    }
    return true;
}
//# sourceMappingURL=employee-validation.js.map