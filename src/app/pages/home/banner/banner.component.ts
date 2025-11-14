import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-banner',
  imports: [RouterLink, ɵInternalFormsSharedModule,FormsModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  destination = signal<string>('')
  checkin = signal('') 
  checkout = signal('')

  onApplyFilter(){
    console.log(this.destination())
    console.log(this.checkin())
    console.log(this.checkout())
  }
}
