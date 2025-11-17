export interface Hotel {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
}

export interface RoomType {
  id: number;
  typeName: string;
  description: string;
  capacity: number;
}

export interface Room {
  id: number;
  roomNumber: string;
  pricePerNight: number;
  roomStatus: number;
  hotelId: number;
  roomTypeId: number;
  hoteName: string;
  roomTypeName: string;
}

export enum RoomStatus {
  Available = 0,
  Booked = 1,
  UnderMaintenance = 2,
}

export interface Customer {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  idProofNumber: string;
}

export interface Booking {
  id: number;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  status: number;
  customerId: number;
  customerName: string;
  roomId: number;
  roomNumber: string;
}

export enum BookingStatus {
  Pending = 0,
  Confirmed = 1,
  Cancelled = 2,
  Completed = 3,
}

export interface Payment {
  id: number;
  paymentDate: string;
  amount: number;
  method: number;
  status: number;
  bookingId: number;
}

export enum PaymentMethod {
  Cash = 0,
  Card = 1,
  UPI = 2,
  Online = 3,
}

export enum PaymentStatus {
  Pending = 0,
  Paid = 1,
  Failed = 2,
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  reviewDate: string;
  hotelId: number;
  hotelName: string;
  customerId: number;
  customerName: string;
}

export interface Employee {
  id : number,
  fullName : string,
  email : string,
  hotelId : number,
  hotelName : string,
  role : string
}
