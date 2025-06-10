/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  role: CreateUserDto.role;
};
export namespace CreateUserDto {
  export enum role {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    GUEST = 'GUEST',
  }
}

