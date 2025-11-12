import { Component } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { DestinationsComponent } from "./destinations/destinations.component";

@Component({
  selector: 'app-home',
  imports: [BannerComponent, DestinationsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

}
