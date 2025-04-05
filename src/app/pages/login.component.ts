import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  login() {
    const body = {
      username: this.username,
      password: this.password,
    };

    this.http.post('http://localhost:8080/api/login', body)
      .subscribe({
        next: (res) => {
          console.log('Login feito com sucesso', res);
        },
        error: (err) => {
          console.error('Erro ao logar', err);
        }
      });
  }
}