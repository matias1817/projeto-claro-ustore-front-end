import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  username: string = '';

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Usuário';
  }

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Running', 'Stoped', 'Paused'],
    datasets: [
      { data: [6, 4, 2], label: 'Status das VMs' }
    ]
  };

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Suas Máquinas', 'Seu Limite'],
    datasets: [{
      data: [70, 30],
      backgroundColor: ['#007bff', '#fd7e14']
    }]
  };

  barChartType: ChartType = 'bar';
  pieChartType: ChartType = 'pie';
}
