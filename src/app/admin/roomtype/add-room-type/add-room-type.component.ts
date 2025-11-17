import { Component } from '@angular/core';
import { RoomtypeComponent } from "../roomtype.component";
import { RoomtypeFormComponent } from "../roomtype-form/roomtype-form.component";

@Component({
  selector: 'app-add-room-type',
  imports: [RoomtypeFormComponent],
  templateUrl: './add-room-type.component.html',
  styleUrl: './add-room-type.component.scss'
})
export class AddRoomTypeComponent {

}
