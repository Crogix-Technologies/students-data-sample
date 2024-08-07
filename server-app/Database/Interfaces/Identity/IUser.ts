export interface IUser{
    _id: string,
    name: string,
    email: string,
    password: string,
    token: string,
    tokenExpireInMinuts: number,
    refreshToken: string,
    refreshTokenExpireInMinuts: number
}