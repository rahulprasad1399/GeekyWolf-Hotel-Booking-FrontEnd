import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HotelListComponent } from './pages/hotel-list/hotel-list.component';
import { HotelDetailsComponent } from './pages/hotel-details/hotel-details.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    {path : '', component : HomeComponent},
    {path : 'hotel-list', component : HotelListComponent},
    {path : 'hotel-details/:id', component : HotelDetailsComponent},
    {path : 'login', component : LoginPageComponent},
    {path : 'admin-dashboard', component : AdminDashboardComponent}
];
