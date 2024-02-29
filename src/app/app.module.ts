import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/Login/login/login.component';
import { RegisterComponent } from './auth/Register/register/register.component';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
