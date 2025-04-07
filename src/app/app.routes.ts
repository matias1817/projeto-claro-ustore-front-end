import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MachinesComponent } from './pages/machines/machines.component';
import { MachineRegistrationComponent } from './pages/machine-registration/machine-registration.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { AuthGuard } from './auth/auth.guard';

 
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
        component:DashboardComponent,
        canActivate: [AuthGuard]

    },
    {
        path:"machines",
        component: MachinesComponent,
        canActivate: [AuthGuard]

    },
    {
        path:"registrationMachine",
        component:MachineRegistrationComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'editar-maquina/:id',
        component: MachineRegistrationComponent,
        canActivate: [AuthGuard]

    },
    {
        path:'userEdit',
        component:UserEditComponent,
        canActivate: [AuthGuard]
    }
];
