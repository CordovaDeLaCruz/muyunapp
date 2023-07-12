import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { RemoveToken, SetToken } from './auth.action';
import { AuthStateModel } from './auth.model';

@State({
  name: 'AuthState',
  defaults: {
    token: null,
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static getToken(state: AuthStateModel) {
    return state;
  }

  @Action(SetToken)
  add(
    { getState, patchState }: StateContext<AuthStateModel>,
    { payload }: SetToken
  ) {
    patchState({ ...payload });
  }

  @Action(RemoveToken)
  remove(
    { getState, patchState }: StateContext<AuthStateModel>,
    {}: RemoveToken
  ) {
    patchState({
      token: null,
    });
  }
}
