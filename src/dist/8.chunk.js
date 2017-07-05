webpackJsonp([8,15],{

/***/ 1038:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_materialize_src__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__users_widgets_users_widget__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__files_service__ = __webpack_require__(1070);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__file_upload_file_upload_component__ = __webpack_require__(1182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__files_files_component__ = __webpack_require__(1183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_file_upload__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_long_press_directive__ = __webpack_require__(1188);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadsModule", function() { return UploadsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var UPLOADS_ROUTES = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_8__files_files_component__["a" /* FilesComponent */] },
    { path: 'file', component: __WEBPACK_IMPORTED_MODULE_7__file_upload_file_upload_component__["a" /* FileUploadComponent */] }
];
var UploadsModule = (function () {
    function UploadsModule() {
    }
    UploadsModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */].forChild(UPLOADS_ROUTES),
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* ReactiveFormsModule */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4_angular2_materialize_src__["a" /* MaterializeModule */],
                __WEBPACK_IMPORTED_MODULE_9_ng2_file_upload__["FileUploadModule"],
                __WEBPACK_IMPORTED_MODULE_5__users_widgets_users_widget__["a" /* UsersWidgetModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_7__file_upload_file_upload_component__["a" /* FileUploadComponent */], __WEBPACK_IMPORTED_MODULE_8__files_files_component__["a" /* FilesComponent */], __WEBPACK_IMPORTED_MODULE_10__shared_long_press_directive__["a" /* LongPress */]],
            providers: [__WEBPACK_IMPORTED_MODULE_6__files_service__["a" /* FilesService */]],
            exports: [__WEBPACK_IMPORTED_MODULE_8__files_files_component__["a" /* FilesComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], UploadsModule);
    return UploadsModule;
}());
//# sourceMappingURL=D:/projects/angular-med/src/uploads.module.js.map

/***/ }),

/***/ 1070:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__users_services_http_client_service__ = __webpack_require__(279);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilesService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FilesService = (function () {
    function FilesService(_http) {
        this._http = _http;
        this._baseUrl = "/api/v1/uploads";
    }
    FilesService.prototype.get = function () {
        return this._http.get(this._baseUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || "Server error"); });
    };
    FilesService.prototype.remove = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this._http.delete(this._baseUrl + "/" + id)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    FilesService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__users_services_http_client_service__["a" /* HttpClient */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__users_services_http_client_service__["a" /* HttpClient */]) === 'function' && _a) || Object])
    ], FilesService);
    return FilesService;
    var _a;
}());
//# sourceMappingURL=D:/projects/angular-med/src/files.service.js.map

/***/ }),

/***/ 1182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_toolbar_service__ = __webpack_require__(192);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileUploadComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UPLOAD_PATH = '/api/v1/uploads/';
var FileUploadComponent = (function () {
    function FileUploadComponent(_toolbar) {
        this._toolbar = _toolbar;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__["FileUploader"]({ url: UPLOAD_PATH });
    }
    FileUploadComponent.prototype.upload = function () {
        var _this = this;
        this.uploader.onBuildItemForm = function (item, form) {
            form.append("signature", _this.signature);
        };
        this.uploader.uploadAll();
    };
    FileUploadComponent.prototype.ngOnInit = function () {
        this._toolbar.change({
            title: "Загрузить файл"
        });
    };
    FileUploadComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-file-upload',
            template: __webpack_require__(1283),
            styles: [__webpack_require__(1242)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_toolbar_service__["a" /* ToolbarService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__shared_toolbar_service__["a" /* ToolbarService */]) === 'function' && _a) || Object])
    ], FileUploadComponent);
    return FileUploadComponent;
    var _a;
}());
//# sourceMappingURL=D:/projects/angular-med/src/file-upload.component.js.map

/***/ }),

/***/ 1183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__files_service__ = __webpack_require__(1070);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_toolbar_service__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_toast_service__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_file_select_service__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_pagination_service__ = __webpack_require__(280);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var UPLOAD_PATH = '/api/v1/uploads/';
var FilesComponent = (function () {
    function FilesComponent(_router, _toastService, _toolbar, _pager, _filesService, fileSelectService) {
        this._router = _router;
        this._toastService = _toastService;
        this._toolbar = _toolbar;
        this._pager = _pager;
        this._filesService = _filesService;
        this.fileSelectService = fileSelectService;
        this.modalDeleteActions = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    FilesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._pager.clear();
        this._toolbar.change({
            title: "Менеджер файлов",
            name: "uploads",
            actions: {
                add: function () { return _this._router.navigate(['/uploads/file']); },
                done: {
                    ok: function () {
                        _this.fileSelectService.stop();
                        _this.fileSelectService.action();
                    },
                    close: function () { return _this.toggleSelectMode(); }
                }
            },
            actionsPosition: {
                extend: ['add']
            }
        });
        if (!this.fileSelectService.selectMode) {
            this.fileSelectService.clear();
        }
        else {
            this._toolbar.setMode('done');
        }
        this._filesService.get()
            .subscribe(function (files) {
            _this.files = files;
            _this.files.map(function (file) {
                _this.fileSelectService.replace(file);
            });
        });
    };
    FilesComponent.prototype.openDeleteModal = function (item) {
        this.currentItem = item;
        this.modalDeleteActions.emit({ action: "modal", params: ['open'] });
    };
    FilesComponent.prototype.closeDeleteModal = function () {
        this.modalDeleteActions.emit({ action: "modal", params: ['close'] });
    };
    FilesComponent.prototype.selectItem = function (item) {
        if (this.fileSelectService.selectMode) {
            this.fileSelectService.add(item);
        }
    };
    FilesComponent.prototype.toggleSelectMode = function () {
        this.fileSelectService.toggle();
        if (this.fileSelectService.selectMode) {
            this._toolbar.setMode('done');
        }
        else {
            this._toolbar.setMode('default');
            this.fileSelectService.clear();
        }
    };
    FilesComponent.prototype.startSelectMode = function () {
        if (!this.fileSelectService.selectMode) {
            this.fileSelectService.singleMode = false;
            this.fileSelectService.toggle();
            this._toolbar.setMode('done');
        }
    };
    FilesComponent.prototype.return = function () {
        this.fileSelectService.returnRoute();
    };
    FilesComponent.prototype.deleteItem = function (item) {
        var _this = this;
        var self = this;
        this._filesService.remove(item._id)
            .subscribe(function (data) {
            if (data.status == 'ok') {
                _this.files.find(function (file, index) {
                    if (item._id == file._id) {
                        self.currentItem = null;
                        self.files.splice(index, 1);
                        return true;
                    }
                });
                _this._toastService.toast("Файл удален");
            }
        });
    };
    FilesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-files',
            template: __webpack_require__(1284),
            styles: [__webpack_require__(1243)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__shared_toast_service__["a" /* ToastService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__shared_toast_service__["a" /* ToastService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_toolbar_service__["a" /* ToolbarService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__shared_toolbar_service__["a" /* ToolbarService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__shared_pagination_service__["a" /* PaginationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__shared_pagination_service__["a" /* PaginationService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__files_service__["a" /* FilesService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__files_service__["a" /* FilesService */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__shared_file_select_service__["a" /* FileSelectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__shared_file_select_service__["a" /* FileSelectService */]) === 'function' && _f) || Object])
    ], FilesComponent);
    return FilesComponent;
    var _a, _b, _c, _d, _e, _f;
}());
//# sourceMappingURL=D:/projects/angular-med/src/files.component.js.map

/***/ }),

/***/ 1188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LongPress; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LongPress = (function () {
    function LongPress() {
        this.duration = 500;
        this.onLongPress = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onLongPressing = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onLongPressEnd = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.mouseX = 0;
        this.mouseY = 0;
    }
    Object.defineProperty(LongPress.prototype, "press", {
        get: function () { return this.pressing; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LongPress.prototype, "longPress", {
        get: function () { return this.longPressing; },
        enumerable: true,
        configurable: true
    });
    LongPress.prototype.onMouseDown = function (event) {
        var _this = this;
        // don't do right/middle clicks
        if (event.which !== 1)
            return;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.pressing = true;
        this.longPressing = false;
        this.timeout = setTimeout(function () {
            _this.longPressing = true;
            _this.onLongPress.emit(event);
            _this.loop(event);
        }, this.duration);
        this.loop(event);
    };
    LongPress.prototype.onMouseMove = function (event) {
        if (this.pressing && !this.longPressing) {
            var xThres = (event.clientX - this.mouseX) > 10;
            var yThres = (event.clientY - this.mouseY) > 10;
            if (xThres || yThres) {
                this.endPress();
            }
        }
    };
    LongPress.prototype.loop = function (event) {
        var _this = this;
        if (this.longPressing) {
            this.timeout = setTimeout(function () {
                _this.onLongPressing.emit(event);
                _this.loop(event);
            }, 50);
        }
    };
    LongPress.prototype.endPress = function () {
        clearTimeout(this.timeout);
        this.longPressing = false;
        this.pressing = false;
        this.onLongPressEnd.emit(true);
    };
    LongPress.prototype.onMouseUp = function () { this.endPress(); };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], LongPress.prototype, "duration", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _a) || Object)
    ], LongPress.prototype, "onLongPress", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _b) || Object)
    ], LongPress.prototype, "onLongPressing", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _c) || Object)
    ], LongPress.prototype, "onLongPressEnd", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.press'), 
        __metadata('design:type', Object)
    ], LongPress.prototype, "press", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.longpress'), 
        __metadata('design:type', Object)
    ], LongPress.prototype, "longPress", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], LongPress.prototype, "onMouseDown", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mousemove', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], LongPress.prototype, "onMouseMove", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseup'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], LongPress.prototype, "onMouseUp", null);
    LongPress = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({ selector: '[long-press]' }), 
        __metadata('design:paramtypes', [])
    ], LongPress);
    return LongPress;
    var _a, _b, _c;
}());
//# sourceMappingURL=D:/projects/angular-med/src/long-press.directive.js.map

/***/ }),

/***/ 1242:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 1243:
/***/ (function(module, exports) {

module.exports = ".card.selected {\r\n    background: #e2ffe2;\r\n    -webkit-transition: box-shadow .25s;\r\n    transition: box-shadow .25s;\r\n    box-shadow: 0;\r\n}\r\n\r\n.fix-right {\r\n    position: absolute;\r\n    right: 10px;\r\n    top: 10px;\r\n}"

/***/ }),

/***/ 1283:
/***/ (function(module, exports) {

module.exports = "<div class=\"form-container row\">\n    <div class=\"input-field col s12\">\n        <input id=\"signatureField\" type=\"text\" name=\"signature\" [(ngModel)] = \"signature\">\n        <label for=\"signatureField\">Подпись</label>\n    </div>\n    <div class=\"file-field input-field col s12\">\n        <div class=\"btn\">\n            <span>Выбрать</span>\n            <input type=\"file\" name=\"image\" ng2FileSelect [uploader]=\"uploader\" multiple />\n        </div>\n        <div class=\"file-path-wrapper\">\n            <input class=\"file-path validate\" type=\"text\" placeholder=\"Выберите один или несколько файлов\">\n        </div>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col s12\">\n        <h3>Готовы к загрузке</h3>\n        <p>Количество: {{ uploader?.queue?.length }}</p>\n\n        <table class=\"table\">\n            <thead>\n            <tr>\n                <th width=\"50%\">Наименование</th>\n                <th>Размер</th>\n                <th>Прогресс</th>\n                <th>Статус</th>\n                <th>Действия</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr *ngFor=\"let item of uploader.queue\">\n                <td><strong>{{ item?.file?.name }}</strong></td>\n                <td *ngIf=\"uploader.isHTML5\" nowrap>{{ item?.file?.size/1024/1024 | number:'.2' }} MB</td>\n                <td *ngIf=\"uploader.isHTML5\">\n                    <div class=\"progress\" style=\"margin-bottom: 0;\">\n                        <div class=\"determinate\" [ngStyle]=\"{ 'width': item.progress + '%' }\"></div>\n                    </div>\n                </td>\n                <td class=\"text-center\">\n                    <span *ngIf=\"item.isSuccess\"><i class=\"glyphicon glyphicon-ok\"></i></span>\n                    <span *ngIf=\"item.isCancel\"><i class=\"glyphicon glyphicon-ban-circle\"></i></span>\n                    <span *ngIf=\"item.isError\"><i class=\"glyphicon glyphicon-remove\"></i></span>\n                </td>\n                <td nowrap>\n                    <button type=\"button\" class=\"btn btn-success btn-xs\"\n                            (click)=\"item.upload()\" [disabled]=\"item.isReady || item.isUploading || item.isSuccess\">\n                        <span class=\"glyphicon glyphicon-upload\"></span> Загрузить\n                    </button>\n                    <button type=\"button\" class=\"btn btn-warning btn-xs\"\n                            (click)=\"item.cancel()\" [disabled]=\"!item.isUploading\">\n                        <span class=\"glyphicon glyphicon-ban-circle\"></span> Отменить\n                    </button>\n                    <button type=\"button\" class=\"btn btn-danger btn-xs\"\n                            (click)=\"item.remove()\">\n                        <span class=\"glyphicon glyphicon-trash\"></span> Удалить\n                    </button>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n\n        <div>\n            <div>\n                Прогресс загрузки:\n                <div class=\"progress\">\n                    <div class=\"determinate\" [ngStyle]=\"{ 'width': uploader.progress + '%' }\"></div>\n                </div>\n            </div>\n            <button type=\"button\" class=\"btn btn-success btn-s\"\n                    (click)=\"upload()\" [disabled]=\"!uploader.getNotUploadedItems().length\">\n                <span class=\"glyphicon glyphicon-upload\"></span> Загрузить все\n            </button>\n            <button type=\"button\" class=\"btn btn-warning btn-s\"\n                    (click)=\"uploader.cancelAll()\" [disabled]=\"!uploader.isUploading\">\n                <span class=\"glyphicon glyphicon-ban-circle\"></span> Отменить все\n            </button>\n            <button type=\"button\" class=\"btn btn-danger btn-s\"\n                    (click)=\"uploader.clearQueue()\" [disabled]=\"!uploader.queue.length\">\n                <span class=\"glyphicon glyphicon-trash\"></span> Удалить все\n            </button>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 1284:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col s6 m3 l2\" *ngFor=\"let file of files\">\n    <!--<div class=\"card horizontal hoverable\" long-press (onLongPress)=\"toggleSelectMode()\" (click)=\"selectItem(file)\" [ngClass]=\"{'selected': file.check}\">\n      <div class=\"card-image valign-wrapper\">\n        <img class=\"valign center-align\" [src]=\"'/api/v1/uploads/thumbs/' + file.filename\">\n      </div>\n      <div class=\"card-stacked\">\n        <div class=\"fix-right\" *ngIf=\"file.check\"><i class=\"material-icons\">done</i></div>\n        <div class=\"card-content\">\n          <p>{{file.signature}}</p>\n        </div>\n        <div class=\"card-action\">\n          <a (click)=\"openDeleteModal(file)\">Удалить</a>\n        </div>\n      </div>\n    </div>-->\n    <div class=\"card hoverable\" long-press (onLongPress)=\"startSelectMode()\" (click)=\"selectItem(file)\" [ngClass]=\"{'selected': file.check}\">\n      <div class=\"card-image\">\n        <img [src]=\"'/api/v1/uploads/thumbs/' + file.filename\">\n      </div>\n      <div class=\"card-content\">\n         <p class=\"truncate\">{{file.signature}}</p>\n      </div>\n      <div class=\"card-action\">\n        <div class=\"fix-right\" *ngIf=\"file.check\"><i class=\"material-icons\">done</i></div>\n        <a (click)=\"openDeleteModal(file)\">Удалить</a>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Delete Modal Structure -->\n<div class=\"modal bottom-sheet\" materialize=\"modal\" [materializeParams]=\"[{dismissible: false}]\" [materializeActions]=\"modalDeleteActions\">\n  <div class=\"modal-content\">\n    <h4>Удалить файл</h4>\n    <p *ngIf=\"currentItem\">Вы хотите удалить файл?</p>\n  </div>\n  <div class=\"modal-footer\">\n    <button class=\"waves-effect waves-green btn-flat\" (click)=\"closeDeleteModal()\">Отменить</button>\n    <button class=\"modal-action modal-close waves-effect waves-green btn\" (click)=\"deleteItem(currentItem)\">Согласен</button>\n  </div>\n</div>"

/***/ })

});
//# sourceMappingURL=8.bundle.map