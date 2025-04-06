import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

interface LoginResponse {
  token: string;
  username: string;
  id: number;
  // outros campos, se houver
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule 
    ,HttpClientModule

  ],
})


export class LoginComponent {
  username = '';
  password = '';
  
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService ){}

  
  login() {
    const body = {
      username: this.username,
      password: this.password,
    };

    this.http.post<LoginResponse>('http://localhost:8080/api/login', body)
      .subscribe({
        next: (res) => {
          const token = res.token; // ou response.accessToken, depende da tua API
          const id = res.id.toString();
          const username = res.username;

          localStorage.setItem('token', token);
          localStorage.setItem("id", id);
          localStorage.setItem("username",username);

          console.log('Login feito com sucesso', res);
          this.toastr.success('Login realizado com sucesso!');

          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.toastr.error('Erro ao fazer login.');
          console.error('Erro ao logar', err);
        }
      });
  }
}