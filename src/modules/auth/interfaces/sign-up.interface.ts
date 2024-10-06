export declare interface ISignUpRequest {
    username: string;
    password: string;
    email: string;
}

export declare interface ISignUpResponse {
    access_token: string;
    refresh_token: string;
}