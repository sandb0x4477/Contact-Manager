import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { MongodbService } from './shared/mongodb.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { AuthService } from './shared/auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ContactEditComponent } from './contact-edit/contact-edit.component';

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      ContactListComponent,
      ContactAddComponent,
      LoginComponent,
      ContactEditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      AppRoutingModule
   ],
   providers: [
      MongodbService,
      AuthService,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
