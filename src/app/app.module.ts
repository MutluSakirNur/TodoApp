import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogTemplateComponent } from './dialog-template/dialog-template.component';
import { DialogService } from './dialog/dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MY_FORMATS } from './models/dateformat';
import {
  MatDatetimepickerModule,
  MatNativeDatetimeModule,
} from '@mat-datetimepicker/core';

@NgModule({
  declarations: [AppComponent, DialogTemplateComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDatetimepickerModule,
    MatNativeDatetimeModule,
  ],
  providers: [
    MatDatepickerModule,
    DialogService,
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogTemplateComponent],
})
export class AppModule {}
