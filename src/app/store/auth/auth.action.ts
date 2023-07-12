import { AuthStateModel } from "./auth.model"

export class SetToken {
  static readonly type = '[AUTH_TOKEN] set'
  constructor(public payload: AuthStateModel) {}
}

export class RemoveToken {
  static readonly type = '[AUTH_TOKEN] remove'
  constructor() {}
}
