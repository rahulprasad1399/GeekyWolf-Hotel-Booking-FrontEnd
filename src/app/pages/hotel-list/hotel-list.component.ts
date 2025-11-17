import { Component, OnInit, inject, signal } from '@angular/core';
import { FilterComponent } from "./filter/filter.component";
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../model/model.component';

@Component({
  selector: 'app-hotel-list',
  imports: [FilterComponent],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss'
})
export class HotelListComponent implements OnInit {

  // hotelList = [
  //   {
  //     "image": "assets/hotel1.png",
  //     "title": "The Grand Parisian",
  //     "rating": 4.8,
  //     "address": "12 Rue de Rivoli, Paris",
  //     "country": "France",
  //     "review": "Luxurious rooms with a breathtaking view of the Eiffel Tower. Excellent service and breakfast.",
  //     "price": 250
  //   },
  //   {
  //     "image": "assets/hotel2.png",
  //     "title": "Skyline Retreat",
  //     "rating": 4.5,
  //     "address": "5th Avenue, New York City",
  //     "country": "USA",
  //     "review": "Modern rooms with skyline views. Close to Central Park. Great for business travelers.",
  //     "price": 220
  //   },
  //   {
  //     "image": "assets/hotel1.png",
  //     "title": "Tokyo Serenity Hotel",
  //     "rating": 4.7,
  //     "address": "1-1-2 Oshiage, Tokyo",
  //     "country": "Japan",
  //     "review": "Peaceful ambiance with traditional Japanese hospitality. Walking distance to Tokyo Skytree.",
  //     "price": 200
  //   },
  //   {
  //     "image": "assets/hotel2.png",
  //     "title": "Palm View Resort",
  //     "rating": 4.6,
  //     "address": "Jumeirah Beach Road, Dubai",
  //     "country": "UAE",
  //     "review": "Luxury beachside resort with amazing pools and spa services. Great for family vacations.",
  //     "price": 300
  //   },
  //   {
  //     "image": "assets/hotel1.png",
  //     "title": "Harbor Lights Hotel",
  //     "rating": 4.4,
  //     "address": "Circular Quay, Sydney",
  //     "country": "Australia",
  //     "review": "Beautiful waterfront view and easy access to the Opera House. Excellent food options nearby.",
  //     "price": 230
  //   }
  // ]

  hotelService = inject(HotelService)

  hotelList = signal<Hotel[]>([])

  ngOnInit() {
    this.hotelService.GetAllHotels().subscribe({
      next : (res) => this.hotelList.set(res),
      error : (err) => console.log(err)
    })
  }
  
}
