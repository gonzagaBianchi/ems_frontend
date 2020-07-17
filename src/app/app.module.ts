import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { LoginModule } from './views/login/login.module';
import { ManagePersonsModule } from './views/manage-persons/manage-persons.module';
import { SharedModule } from './views/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Components
    LoginModule,
    ManagePersonsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
