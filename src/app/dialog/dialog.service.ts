import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';

@Injectable()
export class DialogService {
  constructor(public dialog: MatDialog, private router: Router) {}

  openModal(
    title: string,
    message: string,
    type: boolean,
    redirecturl: string = ''
  ) {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: title,
      message: message,
      type: type,
    };
    dialogConfig.minWidth = 400;

    const dialogRef = this.dialog.open(DialogTemplateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (redirecturl > '' && type) {
        this.router.navigateByUrl(redirecturl);
      }
    });
  }
}
