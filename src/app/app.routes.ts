import { Routes } from '@angular/router';
import { HistoricoComponent } from './components/pages/historico/historico.component';
import { BaterPontoComponent } from './components/pages/bater-ponto/bater-ponto.component';
import { MonitorarFuncionariosComponent } from './components/pages/monitorar-funcionarios/monitorar-funcionarios.component';

export const routes: Routes = [
    {
        path: 'pages/historico',
        component: HistoricoComponent
    },
    {
        path: 'pages/bater-ponto',
        component: BaterPontoComponent
    },
    {
        path: 'pages/monitorar-funcionarios',
        component: MonitorarFuncionariosComponent
    },
    {
        path: '', pathMatch: 'full', //ROTA raiz do projeto
        redirectTo: '/pages/bater-ponto'
    }
];
