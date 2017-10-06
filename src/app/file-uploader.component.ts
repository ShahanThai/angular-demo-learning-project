/**
 * Created by ShahanThai on 05/10/2017.
 */

import {Component, Input, AfterViewInit, EventEmitter, Output } from '@angular/core';


declare var jquery: any;
declare var $: any;
const MAX_FILE_SIZE: number = 8388608;

@Component({
    selector: 'file-uploader',
    templateUrl: 'app/file-uploader.component.html',
    styleUrls: [
        '../../styles/file-uploader.component.css'
    ],
})

export class FileUploaderComponent implements AfterViewInit {

    @Input() activeColor: string = 'green';
    @Input() baseColor: string = '#ccc';
    @Input() overlayColor: string = 'rgba(255,255,255,0.5)';
    @Input() imgURLS: string[] = [];

    dragging: boolean = false;
    loaded: boolean = false;
    imageLoaded: boolean = false;
    @Input() imageSrcs: any[] = [];
    @Output() imageSrcsChange: EventEmitter<any[]>;
    iconColor: string;
    borderColor: string;

    imageLink: string = '';
    uploadImageChoice = '1';

    constructor() {
        this.imageSrcsChange = new EventEmitter<any[]>();
    }

    ngAfterViewInit() {
        $('#uploadChoice').select2({
            placeholder: 'Select upload option',
            width: '100%',
            data: [
                {id: '1', text: 'From file'},
                {id: '2', text: 'From link'}
            ]
        });
        $('#uploadChoice').select2('val', null);
        $('#uploadChoice').on('change',
            (e: any) => {
                this.uploadImageChoice = $(e.target).val();
            }
        );

        // this.imgURLS = this.imageSrcs;
        // for (let url of this.imgURLS) {
        //     this.imageSrcs.push({
        //         src: url,
        //         file: null,
        //         loaded: true,
        //         type: 1
        //     });
        // }
    }

    handleDragEnter() {
        this.dragging = true;
    }

    handleDragLeave() {
        this.dragging = false;
    }

    handleDrop(e: any) {
        e.preventDefault();
        this.dragging = false;
        this.handleInputChange(e);
    }

    handleImageLoad() {
        this.imageLoaded = true;
        this.iconColor = this.overlayColor;
    }

    handleInputChange(e: any) {

        let files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        // let file = e.target ? e.target.files[0] : e.target.files[0];
        for (let file of files) {
            let pattern = /image-*/;

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
            let last = this.imageSrcs.length;
            this.loadImage(this.imageSrcs[last - 1]);
        }
        this.imageSrcsChange.emit(this.imageSrcs);
    }

    loadImage(imgSrc: any) {
        let reader = new FileReader();
        reader.onload = function(e: any){
            imgSrc.src = e.target.result;
            imgSrc.loaded = true;
        };
        // reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(imgSrc.file);
        // for (let imgSrc of this.imageSrc) {
        //     let reader = new FileReader();
        //     reader.onload = function(e: any){
        //         imgSrc.src = e.target.result;
        //         imgSrc.loaded = true;
        //     };
        //     // reader.onload = this._handleReaderLoaded.bind(this);
        //     reader.readAsDataURL(imgSrc.file);
        // }
    };

    removeImg(index: number) {
        if (index > -1) {
            this.imageSrcs.splice(index, 1);
        }
    }
    //
    // _setActive() {
    //     this.borderColor = this.activeColor;
    //     if (this.imageSrcs.length === 0) {
    //         this.iconColor = this.activeColor;
    //     }
    // }
    //
    // _setInactive() {
    //     this.borderColor = this.baseColor;
    //     if (this.imageSrcs.length === 0) {
    //         this.iconColor = this.baseColor;
    //     }
    // }

    getImgFromLink() {
        this.imageSrcs.push({
            src: this.imageLink,
            file: null,
            loaded: false,
            type: 2
        });
        this.imageSrcsChange.emit(this.imageSrcs);
    }

}
