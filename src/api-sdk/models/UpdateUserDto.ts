/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateUserDto = {
  name?: string;
  email?: string;
  password?: string;
  role?: UpdateUserDto.role;
};
export namespace UpdateUserDto {
  export enum role {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    GUEST = 'GUEST',
  }
}

