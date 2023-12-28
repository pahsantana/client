import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EditClinicComponent } from './edit-clinic/edit-clinic.component';
import { CreateClinicComponent } from './create-clinic/create-clinic.component';
import { ListClinicComponent } from './list-clinic/list-clinic.component';
import { MatSelectModule } from '@angular/material/select';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewClinicComponent } from './view-clinic/view-clinic.component';
import { DateFormatPipe } from './pipes/date-formatter.pipe';
import { CnpjMaskPipe } from './pipes/cnpj-mask.pipe';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { TokenService } from './_services/token.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditClinicComponent,
    CreateClinicComponent,
    ListClinicComponent,
    ErrorDialogComponent,
    ViewClinicComponent,
    DateFormatPipe,
    CnpjMaskPipe,
    ConfirmationDialogComponent
  ],
  imports: [
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskDirective,
    MatDialogModule,
  ],
  providers: [
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideClientHydration(),
    provideNgxMask({}),
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
