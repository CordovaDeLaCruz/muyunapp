export class SignInDto {
  username_email: string;
  password: string;
  // user_type:number;
}

export class SignInResponseDto {
  token: string;
  id: number;
  firstName: string;
  forcePassword: boolean;
  forcePasswordMessage: string;
  ok: boolean;
}
