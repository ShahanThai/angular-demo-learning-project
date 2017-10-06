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
var MAX_FILE_SIZE = 8388608;
var FileUploaderComponent = (function () {
    function FileUploaderComponent() {
        this.activeColor = 'green';
        this.baseColor = '#ccc';
        this.overlayColor = 'rgba(255,255,255,0.5)';
        this.imgURLS = [];
        this.dragging = false;
        this.loaded = false;
        this.imageLoaded = false;
        this.imageSrcs = [];
        this.imageLink = '';
        this.uploadImageChoice = '1';
        this.imageSrcsChange = new core_1.EventEmitter();
    }
    FileUploaderComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $('#uploadChoice').select2({
            placeholder: 'Select upload option',
            width: '100%',
            data: [
                { id: '1', text: 'From file' },
                { id: '2', text: 'From link' }
            ]
        });
        $('#uploadChoice').select2('val', null);
        $('#uploadChoice').on('change', function (e) {
            _this.uploadImageChoice = $(e.target).val();
        });
    };
    FileUploaderComponent.prototype.handleDragEnter = function () {
        this.dragging = true;
    };
    FileUploaderComponent.prototype.handleDragLeave = function () {
        this.dragging = false;
    };
    FileUploaderComponent.prototype.handleDrop = function (e) {
        e.preventDefault();
        this.dragging = false;
        this.handleInputChange(e);
    };
    FileUploaderComponent.prototype.handleImageLoad = function () {
        this.imageLoaded = true;
        this.iconColor = this.overlayColor;
    };
    FileUploaderComponent.prototype.handleInputChange = function (e) {
        var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            var pattern = /image-*/;
            if (!file.type.match(pattern)) {
                alert('Invalid format');
                return;
            }
            if (file.size > MAX_FILE_SIZE) {
                alert('Exceed max file size');
                return;
            }
            this.imageSrcs.push({
                src: '',
                file: file,
                loaded: false,
                type: 3
            });
            var last = this.imageSrcs.length;
            this.loadImage(this.imageSrcs[last - 1]);
        }
        this.imageSrcsChange.emit(this.imageSrcs);
    };
    FileUploaderComponent.prototype.loadImage = function (imgSrc) {
        var reader = new FileReader();
        reader.onload = function (e) {
            imgSrc.src = e.target.result;
            imgSrc.loaded = true;
        };
        reader.readAsDataURL(imgSrc.file);
    };
    ;
    FileUploaderComponent.prototype.removeImg = function (index) {
        if (index > -1) {
            this.imageSrcs.splice(index, 1);
        }
    };
    FileUploaderComponent.prototype.getImgFromLink = function () {
        this.imageSrcs.push({
            src: this.imageLink,
            file: null,
            loaded: false,
            type: 2
        });
        this.imageSrcsChange.emit(this.imageSrcs);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FileUploaderComponent.prototype, "activeColor", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FileUploaderComponent.prototype, "baseColor", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FileUploaderComponent.prototype, "overlayColor", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FileUploaderComponent.prototype, "imgURLS", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FileUploaderComponent.prototype, "imageSrcs", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FileUploaderComponent.prototype, "imageSrcsChange", void 0);
    FileUploaderComponent = __decorate([
        core_1.Component({
            selector: 'file-uploader',
            templateUrl: 'app/file-uploader.component.html',
            styleUrls: [
                '../../styles/file-uploader.component.css'
            ],
        }),
        __metadata("design:paramtypes", [])
    ], FileUploaderComponent);
    return FileUploaderComponent;
}());
exports.FileUploaderComponent = FileUploaderComponent;
//# sourceMappingURL=file-uploader.component.js.map