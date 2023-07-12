import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from '../constants/user.constants';
faker.setLocale('es_MX');

export interface User {
  id: number;
  code: string;
  role: Profile;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private page = 1;
  private limit = 10;
  private _fullUsers: User[] = [];
  private _viewableUsers: User[] = [];
  private userSubject$: BehaviorSubject<User[]>;

  private selectedUser: User | null = null;
  private userSelectedSubject$: BehaviorSubject<User | null>;

  constructor() {
    this.userSubject$ = new BehaviorSubject(this._viewableUsers);
    this.userSelectedSubject$ = new BehaviorSubject(this.selectedUser);

    for (let i = 0; i < 60; i++) {
      this._fullUsers.push(this.generateUser());
    }

    this._viewableUsers = this._fullUsers.slice(this.page - 1, this.limit);
    this.userSubject$.next(this._viewableUsers);
  }

  generateUser(): User {
    const id = faker.datatype.number({ min: 1, max: 10000 });
    const firstName = faker.name.firstName() + ' ' + faker.name.firstName();
    const lastName = faker.name.lastName() + ' ' + faker.name.lastName();
    const role = faker.helpers.randomize([
      Profile.Admin,
      Profile.Guide,
      Profile.Passenger,
    ]);
    const code =
      faker.helpers.randomize(['A', 'G', 'M']) +
      faker.helpers.replaceSymbols('###');
    const email = faker.internet.email();

    return { firstName, lastName, role, code, email, id };
  }

  getUsersLength(){
    return this._fullUsers.length
  }

  getUsers(page?: number): Observable<User[]> {
    if (page) {
      this._viewableUsers = this._fullUsers.slice(page - 1, this.limit);
    } else {
      this._viewableUsers = this._fullUsers.slice(this.page - 1, this.limit);
    }

    return this.userSubject$.asObservable();
  }

  getSelectedUser() {
    return this.userSelectedSubject$.asObservable();
  }

  setSelectedUser(user: User) {
    this.selectedUser = user;
    this.userSelectedSubject$.next(this.selectedUser);
  }
}
