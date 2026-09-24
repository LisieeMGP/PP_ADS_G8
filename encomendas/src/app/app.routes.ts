import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/dashboard/home/home.component';
import { ResidentFormComponent } from './features/residents/resident-form/resident-form.component';
import { DeliveryFormComponent } from './features/deliveries/delivery-form/delivery-form.component';
import { DeliveryListComponent } from './features/deliveries/delivery-list/delivery-list.component';
import { PickupPageComponent } from './features/deliveries/pickup-page/pickup-page.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'inicio', component: HomeComponent, canActivate: [authGuard] },
	{ path: 'moradores', component: ResidentFormComponent, canActivate: [authGuard] },
	{ path: 'encomendas/registrar', component: DeliveryFormComponent, canActivate: [authGuard] },
	{ path: 'encomendas/consultar', component: DeliveryListComponent, canActivate: [authGuard] },
	{ path: 'encomendas/retirada', component: PickupPageComponent, canActivate: [authGuard] },
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
	{ path: '**', redirectTo: 'login' },
];
