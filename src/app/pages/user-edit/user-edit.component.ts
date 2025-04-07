import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class UserEditComponent implements OnInit {
  userForm!: FormGroup;
  userId = localStorage.getItem('id');
  username = localStorage.getItem('username') || 'Usuário';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      limiteVm: ['', Validators.required]
    });

    this.carregarUser();    
  }

  carregarUser(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const userId = localStorage.getItem('id');


    this.http.get<any>(`http://localhost:8080/api/user/${userId}`, {headers}).subscribe({
      next: (data) => {
        this.userForm.patchValue(data);
      },
      error: (error) => {
        this.toastr.error('Erro ao carregar dados do usuário.',);
        console.log(error)
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const dados = this.userForm.value;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
     
        if (this.userId) {
          this.http.put(`http://localhost:8080/api/user/${this.userId}`, dados, {headers}).subscribe({
            next: () => {
              this.toastr.success('Usuário atualizado com sucesso!');
              this.router.navigate(['/machines']);
            },
            error: (err) => {

                this.toastr.error('Erro ao atualizar');
              
              console.error('Erro:', err);
            }
      });
    }
  }
  }
  logout() {
    localStorage.clear(); 
    this.router.navigate(['/']); 
  }
  voltar() {
    this.router.navigate(['/machines']);
  }
}
