import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PainelComponent } from './pages/painel/painel.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { PrimeiroAcessoComponent } from './pages/primeiro-acesso/primeiro-acesso.component';
import { firstAcessGuard } from './core/guards/first-acess.guard';



export const routes: Routes = [
    {path:'', component:HomeComponent ,children:[
      {path:'', component:PainelComponent, children:[
        {path:'', loadComponent:()=> import('./pages/card-view/card-view.component').then((c)=> c.CardViewComponent)},
        {path:'card', loadComponent:()=> import('./pages/card-view/card-view.component').then((c)=> c.CardViewComponent)},
        {path:'card/:id', loadComponent:()=> import('./pages/card-view/card-view.component').then((c)=> c.CardViewComponent)},
        {path:'saude', loadComponent:()=> import('./pages/saude/saude.component').then((c)=> c.SaudeComponent)},
        {path:'esporte', loadComponent:()=> import('./pages/esporte/esporte.component').then((c)=> c.EsporteComponent)},
        {path:'convenios', loadComponent:()=> import('./pages/convenios/convenios.component').then((c)=> c.ConveniosComponent)},
        {path:'dependente', loadComponent:()=> import('./pages/dependente/dependente.component').then((c)=> c.DependenteComponent)},
        {path:'dependente/:id', loadComponent:()=> import('./pages/dependente/dependente.component').then((c)=> c.DependenteComponent)},
        {path:'lista-dependentes', loadComponent:()=> import('./pages/lista-dependente/lista-dependente.component').then((c)=> c.ListaDependenteComponent)},
      ]},
      {path:'perfil', loadComponent:()=> import('./pages/perfil/perfil.component').then((c)=> c.PerfilComponent)},
    ], canActivate:[authGuard, firstAcessGuard] },
    {path:'primeiro-acesso', component:PrimeiroAcessoComponent},
    {path:'login', component:LoginComponent, canActivate:[authGuard]},
    {path:'cadastro', loadComponent:()=> import('./pages/cadastro/cadastro.component').then((c)=> c.CadastroComponent), canActivate:[authGuard]},
];

export class AppRoutingModule {
  
}