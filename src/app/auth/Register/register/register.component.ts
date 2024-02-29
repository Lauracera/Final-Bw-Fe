import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  admin!: User | null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if (user) {
      let isUser = JSON.parse(user);
      if (isUser.user.role === 'admin') {
        this.admin = isUser;
      }
    }
  }

  registra(form: NgForm) {
    if (!this.admin) {
      form.value.role = 'user';
      try {
        this.authService.register(form.value).subscribe();
        this.router.navigate(['/login']);
      } catch (error: any) {
        console.log(error);
        if (error.status === 400) {
          alert('Email già registrata!');
          this.router.navigate(['/register']);
        }
      }
    } else {
      try {
        this.authService.register(form.value).subscribe();
        this.router.navigate(['/login']);
      } catch (error: any) {
        console.log(error);
        if (error.status === 400) {
          alert('Email già registrata!');
          this.router.navigate(['/register']);
        }
      }
    }
  }
}
