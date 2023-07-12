import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../constants/user.constants';
import { UserDataService, User } from '../../services/user-data.service';
import {
  UserTravelService,
  UserTravel,
} from '../../services/user-travel.service';
import * as moment from 'moment';




@Component({
  selector: 'app-review-user',
  templateUrl: './review-user.component.html',
  styleUrls: ['./review-user.component.scss'],
})
export class ReviewUserComponent implements OnInit {
  displayedColumns: string[] = ['guide', 'route', 'travelTime'];

  travels: UserTravel[] = [];
  selectedUser: User | null = null;

  constructor(
    private userService: UserDataService,
    private userTravelService: UserTravelService
  ) {
    this.userService.getSelectedUser().subscribe((user) => {
      this.selectedUser = user;
    });
    this.userTravelService.getUserTravels().subscribe((travels) => {
      this.travels = travels;
    });
  }

  ngOnInit(): void {}

  getUserProfileLabel(profileValue: string) {
    return UserProfile.find((t) => t.value == profileValue)?.name;
  }

  getTravelTimeFormat(travelTime: Date){
    return moment(travelTime).format('DD-MM-YYYY HH:mm:ss')
  }
}
