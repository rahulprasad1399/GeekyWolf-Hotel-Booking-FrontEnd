import { Component } from '@angular/core';


@Component({
  selector: 'app-destinations',
  imports: [],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss'
})
export class DestinationsComponent {
  data = [
    {
      "city": "Paris",
      "image": "assets/paris.png"
    },
    {
      "city": "Tokyo",
      "image": "assets/tokyo.png"
    },
    {
      "city": "Santorini",
      "image": "assets/santorini.png"
    },
    {
      "city": "New York",
      "image": "assets/newYork.png"
    },
    {
      "city": "Sydney",
      "image": "assets/sydney.png"
    },
    {
      "city": "Rome",
      "image": "assets/rome.png"
    }
  ]
}
