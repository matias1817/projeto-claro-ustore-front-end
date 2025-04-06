import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../service/machine.service';
import { Machine } from '../../model/machine.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  imports: [CommonModule, RouterModule], 
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  maquinas: Machine[] = [];

  constructor(private machineService: MachineService) {}

  ngOnInit(): void {
    this.carregarMaquinasDoUsuario();
  }

  carregarMaquinasDoUsuario(): void {
    this.machineService.getByUser().subscribe({
      next: (data) => {
        this.maquinas = data;
      },
      error: (err) => {
        console.error('Erro ao carregar máquinas:', err);
      }
    });
  }



  deleteMachine(id: number): void {
    this.machineService.deleteMachine(id);

   
    console.log(`Delete machine ${id}`);

    this.carregarMaquinasDoUsuario();
    this.carregarMaquinasDoUsuario();

  }

  editMachine(id: number): void {
    console.log(`Edit machine ${id}`);
  }
  
  stopMachine(id: number): void {
    this.machineService.stopMachine(id);
    this.carregarMaquinasDoUsuario(); // Atualiza a lista na tela
    console.log(`Stop machine ${id}`);
  }
  
  startMachine(id: number): void {
    this.machineService.startMachine(id);
    this.carregarMaquinasDoUsuario();
    console.log(`Start machine ${id}`);
  }
  
  pauseMachine(id: number): void {
    this.machineService.pauseMachine(id);
    this.carregarMaquinasDoUsuario();
    console.log(`Pause machine ${id}`);
  }
  
}
