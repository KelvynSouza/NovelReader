import { Component, OnInit, ElementRef, Inject } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import {
    Location,
    LocationStrategy,
    PathLocationStrategy
} from "@angular/common";
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, matBottomSheetAnimations } from "@angular/material";
import { BookReaderService } from "app/book-reader/book-reader.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { SnackbarComponent } from "./snackbar/snackbar.component";

export interface DialogData {
    link: string;
}

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    durationInSeconds = 5;

    uploadForm: FormGroup;      
    fileAlive: boolean = false;
    buttonDisable: boolean = false;


    constructor(
        location: Location,
        private element: ElementRef,
        private router: Router,
        private bookService: BookReaderService,
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar
    ) {
        this.location = location;
        this.sidebarVisible = false;
    }    

    ngOnInit() {

        this.uploadForm = this.formBuilder.group({
            profile: ['']
        });

        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
        this.router.events.subscribe(event => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName("close-layer")[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
    }

    changeFile(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.uploadForm.get('profile').setValue(file);
            this.fileAlive = true;
        }
    }

    processChanges() {
        this.fileAlive = false;

        const formData = new FormData();
        formData.append('file', this.uploadForm.get('profile').value);

        this.bookService.postFillDatabaseChaptersByFile(formData)
            .then(res => {
                 console.log("Carregamento de capitulos por arquivo realizado com sucesso") 
                })
            .catch(rej => { 
                console.log("Nao foi possivel realizar chamada para recarregar  capitulos") 
            });
    }

    defaultChapters() {
        this.fileAlive = false;
        this.buttonDisable = true;
        this.bookService.postFillDatabaseChapters()
            .then(res => { 
                this.buttonDisable = false; 
                console.log("Carregamento de capitulos realizado com sucesso") 
                this.openSnackBar("Carregado com sucesso!")
            })
            .catch(rej => { 
                console.log("Nao foi possivel realizar chamada para recarregar capitulos")  
                this.openSnackBar("Falha ao carregar!")
            });        
    }

    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
    openSnackBar(message) {
        this._snackBar.openFromComponent(SnackbarComponent, {
          duration: this.durationInSeconds * 1000,
          data: message,
          horizontalPosition: this.horizontalPosition,    
          verticalPosition: this.verticalPosition

        });
      }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName("body")[0];
        setTimeout(function () {
            toggleButton.classList.add("toggled");
        }, 500);

        body.classList.add("nav-open");

        this.sidebarVisible = true;
    }
    sidebarClose() {
        const body = document.getElementsByTagName("body")[0];
        this.toggleButton.classList.remove("toggled");
        this.sidebarVisible = false;
        body.classList.remove("nav-open");
    }
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName("navbar-toggler")[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName("body")[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove("nav-open");
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove("toggled");
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add("toggled");
            }, 430);

            var $layer = document.createElement("div");
            $layer.setAttribute("class", "close-layer");

            if (body.querySelectorAll(".main-panel")) {
                document.getElementsByClassName("main-panel")[0].appendChild($layer);
            } else if (body.classList.contains("off-canvas-sidebar")) {
                document
                    .getElementsByClassName("wrapper-full-page")[0]
                    .appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add("visible");
            }, 100);

            $layer.onclick = function () {
                //asign a function
                body.classList.remove("nav-open");
                this.mobile_menu_visible = 0;
                $layer.classList.remove("visible");
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove("toggled");
                }, 400);
            }.bind(this);

            body.classList.add("nav-open");
            this.mobile_menu_visible = 1;
        }
    }
    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === "#") {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return "Book";
    }
}

