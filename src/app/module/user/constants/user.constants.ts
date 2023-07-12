export enum Profile {
  Admin = 'ADMIN',
  Guide = 'GUIDE',
  Passenger = 'PASSENGER',
  Explorer = 'EXPLORER',
}

export const UserProfile = [
  {
    name: 'Administrador',
    value: Profile.Admin,
  },
  {
    name: 'Guía',
    value: Profile.Guide,
  },
  {
    name: 'Pasajero',
    value: Profile.Passenger,
  },
];
