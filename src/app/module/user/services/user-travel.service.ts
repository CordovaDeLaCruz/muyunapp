import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { BehaviorSubject } from 'rxjs';
faker.setLocale('es_MX');

export interface Guide {
  firstname: string;
  lastname: string;
}

export interface UserTravel {
  guide: Guide;
  route: string;
  travelTime: Date;
}

@Injectable({
  providedIn: 'root',
})
export class UserTravelService {
  private _travels: UserTravel[] = [];
  private userTravelSubject$: BehaviorSubject<UserTravel[]>;

  constructor() {
    this.userTravelSubject$ = new BehaviorSubject(this._travels);
  }

  generateUserTravels() {
    this._travels = []
    for (let i = 0; i < faker.datatype.number({ min: 2, max: 6 }); i++) {
      this._travels.push(this.generateTravel());
    }

    this.userTravelSubject$.next(this._travels);
  }

  private generateTravel(): UserTravel {
    const guideFirstname = faker.name.firstName();
    const guideLastname = faker.name.lastName();
    const route = faker.address.state();
    const travelTime = faker.date.past();

    return {
      guide: {
        firstname: guideFirstname,
        lastname: guideLastname,
      },
      route,
      travelTime,
    };
  }

  getUserTravels() {
    this.generateUserTravels();
    return this.userTravelSubject$.asObservable();
  }
}
