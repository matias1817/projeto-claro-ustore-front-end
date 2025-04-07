import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: string = '';
  totalVMs: number = 0;
  limiteVMs: number = 0;

  statusCount: { [key: string]: number } = {
    RUNNING: 0,
    STOPPED: 0,
    PAUSED: 0
  };

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Running', 'Stopped', 'Paused'],
    datasets: [
      { data: [0, 0, 0], label: 'Status das VMs' }
    ]
  };

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Suas Máquinas', 'Seu Limite'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#007bff', '#fd7e14']
    }]
  };

  barChartType: ChartType = 'bar';
  pieChartType: ChartType = 'pie';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Usuário';
    this.carregarLimiteDoCliente();
  }

  carregarLimiteDoCliente(): void {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');

    this.http.get<any>(`http://localhost:8080/api/user/${userId}`).subscribe({
      next: (data) => {
        this.limiteVMs = data.limiteVm;
        this.buscarDadosDasMaquinas();
      },
      error: (err) => {
        console.error('Erro ao buscar limite do cliente:', err);
      }
    });
  }
  logout() {
    localStorage.clear(); 
    this.router.navigate(['/']); 
  }
  buscarDadosDasMaquinas(): void {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');

  

    this.http.get<any[]>(`http://localhost:8080/api/machine/user/${userId}`).subscribe({
      next: (data) => {
        this.totalVMs = data.length;

        this.statusCount = {
          RUNNING: 0,
          STOPED: 0,
          PAUSED: 0
        };

        data.forEach(maquina => {
          if (this.statusCount[maquina.status] !== undefined) {
            this.statusCount[maquina.status]++;
          }
        });

        // Atualiza gráfico de barras
        this.barChartData.datasets[0].data = [
          this.statusCount['RUNNING'],
          this.statusCount['STOPED'],
          this.statusCount['PAUSED']
        ];
        this.barChartData = { ...this.barChartData };


        // Atualiza gráfico de pizza
        this.pieChartData.datasets[0].data = [
          this.totalVMs,
          Math.max(0, this.limiteVMs - this.totalVMs)
        ];
        this.pieChartData = { ...this.pieChartData };

      },
      error: (err) => {
        console.error('Erro ao buscar máquinas:', err);
      }
    });
  }
}
