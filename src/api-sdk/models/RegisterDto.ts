/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RegisterDto = {
  name: string;
  email: string;
  password: string;
  role: RegisterDto.role;
};
export namespace RegisterDto {
  export enum role {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    GUEST = 'GUEST',
  }
}

