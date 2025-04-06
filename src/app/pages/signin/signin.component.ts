import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  imports: [
    CommonModule,
    FormsModule 
    ,HttpClientModule

  ],
})
export class SigninComponent {
  username = '';
  password = '';
  email = '';
  cpf='';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService  ) {}

  login() {
    const body = {
      name: this.username,
      password: this.password,
      email: this.email,
      limiteVm: 5,
      cpf: this.cpf
    };

    this.http.post('http://localhost:8080/api/user', body)
      .subscribe({
        next: (res) => {
          console.log('Cadastro feito com sucesso', res);
          this.toastr.success("Cadastro realizado com sucesso.")
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erro ao cadastrar', err);
          this.toastr.error("Erro ao cadastrar.")
        }
      });
  }
}