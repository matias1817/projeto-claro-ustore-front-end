import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-machine-registration',
  standalone: true,
  templateUrl: './machine-registration.component.html',
  styleUrls: ['./machine-registration.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class MachineRegistrationComponent implements OnInit {
  maquinaForm!: FormGroup;
  maquinaId?: number;
  username = localStorage.getItem('username') || 'Usuário';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.maquinaForm = this.fb.group({
      displayName: ['', Validators.required],
      cpu: ['', Validators.required],
      memory: ['', Validators.required],
      userId: Number(localStorage.getItem('id')),
      status: 'RUNNING'
    });

    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if (idFromRoute) {
      this.maquinaId = Number(idFromRoute);
      this.carregarDadosMaquina(this.maquinaId);
    }
  }

  carregarDadosMaquina(id: number): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any>(`http://localhost:8080/api/machine/${id}`, { headers }).subscribe({
      next: (data) => {
        this.maquinaForm.patchValue(data);
      },
      error: () => {
        this.toastr.error('Erro ao carregar dados da máquina.');
      }
    });
  }

  onSubmit(): void {
    if (this.maquinaForm.valid) {
      const dados = this.maquinaForm.value;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      const request$ = this.maquinaId
        ? this.http.put(`http://localhost:8080/api/machine/${this.maquinaId}`, dados, { headers })
        : this.http.post('http://localhost:8080/api/machine', dados, { headers });

      request$.subscribe({
        next: () => {
          const msg = this.maquinaId ? 'atualizada' : 'cadastrada';
          this.toastr.success(`Máquina ${msg} com sucesso!`);
          this.router.navigate(['/machines']);
        },
        error: (err) => {
          this.toastr.error(`Erro ao ${this.maquinaId ? 'atualizar' : 'cadastrar'} máquina.`);
          console.error('Erro:', err);
        }
      });
    }
  }

  voltar() {
    this.router.navigate(['/machines']);
  }
}
