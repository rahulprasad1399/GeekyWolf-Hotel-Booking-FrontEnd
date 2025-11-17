import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HotelListComponent } from './pages/hotel-list/hotel-list.component';
import { HotelDetailsComponent } from './pages/hotel-details/hotel-details.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HotelComponent } from './admin/hotel/hotel.component';
import { RoomComponent } from './admin/room/room.component';
import { RoomtypeComponent } from './admin/roomtype/roomtype.component';
import { CustomerComponent } from './admin/customer/customer.component';
import { BookingComponent } from './admin/booking/booking.component';
import { PaymentComponent } from './admin/payment/payment.component';
import { EmployeeComponent } from './admin/employee/employee.component';
import { ReviewComponent } from './admin/review/review.component';
import { AddHotelComponent } from './admin/hotel/add-hotel/add-hotel.component';
import { EditHotelComponent } from './admin/hotel/edit-hotel/edit-hotel.component';
import { ListHotelComponent } from './admin/hotel/list-hotel/list-hotel.component';
import { ListRoomTypeComponent } from './admin/roomtype/list-room-type/list-room-type.component';
import { AddRoomTypeComponent } from './admin/roomtype/add-room-type/add-room-type.component';
import { EditRoomTypeComponent } from './admin/roomtype/edit-room-type/edit-room-type.component';
import { ListRoomComponent } from './admin/room/list-room/list-room.component';
import { AddRoomComponent } from './admin/room/add-room/add-room.component';
import { EditRoomComponent } from './admin/room/edit-room/edit-room.component';
import { ListCustomerComponent } from './admin/customer/list-customer/list-customer.component';
import { ListBookingComponent } from './admin/booking/list-booking/list-booking.component';
import { ListPaymentComponent } from './admin/payment/list-payment/list-payment.component';
import { ListReviewComponent } from './admin/review/list-review/list-review.component';
import { ListEmployeeComponent } from './admin/employee/list-employee/list-employee.component';
import { AddEmployeeComponent } from './admin/employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './admin/employee/edit-employee/edit-employee.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hotel-list', component: HotelListComponent },
  { path: 'hotel-details/:id', component: HotelDetailsComponent },
  { path: 'admin-login', component: LoginPageComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'hotels', pathMatch: 'full' },
      {
        path: 'hotels',
        component: HotelComponent,
        children: [
          { path: '', component: ListHotelComponent },
          { path: 'hotels-add', component: AddHotelComponent },
          { path: 'hotel-edit/:hotelId', component: EditHotelComponent },
        ],
      },
      {
        path: 'rooms',
        component: RoomComponent,
        children: [
          { path: '', component: ListRoomComponent },
          { path: 'rooms-add', component: AddRoomComponent },
          { path: 'room-edit/:roomId', component: EditRoomComponent },
        ],
      },
      {
        path: 'room-types',
        component: RoomtypeComponent,
        children: [
          { path: '', component: ListRoomTypeComponent },
          { path: 'roomtypes-add', component: AddRoomTypeComponent },
          {
            path: 'roomtypes-edit/:roomTypeId',
            component: EditRoomTypeComponent,
          },
        ],
      },
      {
        path: 'customers',
        component: CustomerComponent,
        children: [{ path: '', component: ListCustomerComponent }],
      },
      {
        path: 'bookings',
        component: BookingComponent,
        children: [{ path: '', component: ListBookingComponent }],
      },
      {
        path: 'payments',
        component: PaymentComponent,
        children: [{ path: '', component: ListPaymentComponent }],
      },
      {
        path: 'employees',
        component: EmployeeComponent,
        children: [
          { path: '', component: ListEmployeeComponent },
          { path: 'employee-add', component: AddEmployeeComponent },
          { path: 'employee-edit/:employeeId', component: EditEmployeeComponent },
        ],
      },
      {
        path: 'reviews',
        component: ReviewComponent,
        children: [{ path: '', component: ListReviewComponent }],
      },
    ],
  },
];
