export type TCreateUserResponse = {
    data: {
        token: string;
        username: string;
    };
    message: string;
}

export type TLoginResponse = {
    data: {
        token: string;
        username: string;
    };
    message: string;
}
