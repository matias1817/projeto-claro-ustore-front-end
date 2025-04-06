import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MachinesComponent } from './pages/machines/machines.component';
import { MachineRegistrationComponent } from './pages/machine-registration/machine-registration.component';

 
export const routes: Routes = [ 
    {
        path: '',
        component: LoginComponent, 
    },
    {
        path:'signin',
        component:SigninComponent,
    },
    {
        path:'dashboard',
        component:DashboardComponent
    },
    {
        path:"machines",
        component: MachinesComponent
    },
    {
        path:"registrationMachine",
        component:MachineRegistrationComponent
    },
    {
        path: 'editar-maquina/:id',
        component: MachineRegistrationComponent
      }
      
];
