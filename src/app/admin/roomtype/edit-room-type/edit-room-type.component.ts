import { Component } from '@angular/core';
import { RoomtypeComponent } from "../roomtype.component";
import { RoomtypeFormComponent } from "../roomtype-form/roomtype-form.component";

@Component({
  selector: 'app-edit-room-type',
  imports: [RoomtypeFormComponent],
  templateUrl: './edit-room-type.component.html',
  styleUrl: './edit-room-type.component.scss'
})
export class EditRoomTypeComponent {

}
