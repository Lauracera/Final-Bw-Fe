import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/Login/login/login.component';
import { RegisterComponent } from './auth/Register/register/register.component';
import { RouterModule, Route } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProfileComponent,
  ],
<<<<<<< Updated upstream
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(routes)],
=======
  imports: [BrowserModule, AppRoutingModule, FormsModule],
>>>>>>> Stashed changes
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
