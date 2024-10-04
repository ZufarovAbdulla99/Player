export declare interface ICreateUserRequest {
    username : string,
    password : string,
    email : string;
    image :  string;
    role : "user" | "admin";
}