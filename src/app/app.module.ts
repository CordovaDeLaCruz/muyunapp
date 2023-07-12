import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { LayoutModule } from './layout/layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptorService } from './core/interceptors/auth-interceptor.service';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomPaginator } from './shared/helpers/internationalization/custom-paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: { day: 'numeric', month: 'short', year: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    LayoutModule,
    RouterModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    SnackbarComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginator,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
