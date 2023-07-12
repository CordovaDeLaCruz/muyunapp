import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { ValidatorsMessagesComponent } from './helpers/custom-validation/validators-messages/validators-messages.component';
import { ModalFinishedSessionComponent } from './components/modal-finished-session/modal-finished-session.component';
import { ModalSuccessComponent } from './components/modal-success/modal-success.component';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';

@NgModule({
  declarations: [
    SidebarComponent,
    ErrorPageComponent,
    HeaderComponent,
    FooterComponent,
    SnackbarComponent,
    ModalFinishedSessionComponent,
    ValidatorsMessagesComponent,
    ModalSuccessComponent,
    ModalErrorComponent
  ],
  imports: [CommonModule, MaterialModule, FlexLayoutModule, RouterModule],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    FlexLayoutModule,
    SnackbarComponent,
    ModalFinishedSessionComponent,
    ValidatorsMessagesComponent,
    ModalSuccessComponent,
    ModalErrorComponent
  ],
})
export class SharedModule {}
