import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Machine } from '../model/machine.model';

@Injectable({
  providedIn: 'root',
})

export class MachineService {
  private apiUrl = 'http://localhost:8080/api/machine';

  constructor(private http: HttpClient) {}

  getByUser(): Observable<Machine[]>{
    return this.http.get<Machine[]>(`${this.apiUrl}/user/${localStorage.getItem("id")}`);
  }

  deleteMachine(id:number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      pdated => console.log('Máquina deletada'),
      error => console.error('Erro ao atualizar máquina:', error)
    )
  }
  

  stopMachine(id: number): void {
    this.http.get<Machine>(`${this.apiUrl}/${id}`).subscribe(
      (machine) => {
        // Faz a alteração no atributo desejado
        machine.status = "STOPED";
        // Agora faz o PUT com o objeto completo
        this.http.put<Machine>(`${this.apiUrl}/${id}`, machine).subscribe(
          updated => console.log('Máquina atualizada:', updated),
          error => console.error('Erro ao atualizar máquina:', error)
        );
      },
      (error) => {
        console.error('Erro ao buscar máquina:', error);
      }
    );
  }
  
  startMachine(id: number): void {
    this.http.get<Machine>(`${this.apiUrl}/${id}`).subscribe(
      (machine) => {
        // Faz a alteração no atributo desejado
        machine.status = "RUNNING";
        // Agora faz o PUT com o objeto completo
        this.http.put<Machine>(`${this.apiUrl}/${id}`, machine).subscribe(
          updated => console.log('Máquina atualizada:', updated),
          error => console.error('Erro ao atualizar máquina:', error)
        );
      },
      (error) => {
        console.error('Erro ao buscar máquina:', error);
      }
    );
  }
  
  pauseMachine(id: number): void {
    this.http.get<Machine>(`${this.apiUrl}/${id}`).subscribe(
      (machine) => {
        // Faz a alteração no atributo desejado
        machine.status = "PAUSED";
        // Agora faz o PUT com o objeto completo
        this.http.put<Machine>(`${this.apiUrl}/${id}`, machine).subscribe(
          updated => console.log('Máquina atualizada:', updated),
          error => console.error('Erro ao atualizar máquina:', error)
        );
      },
      (error) => {
        console.error('Erro ao buscar máquina:', error);
      }
    );
  }
  

  

}
