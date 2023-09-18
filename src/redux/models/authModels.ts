export interface LoadingActionModel {
    requestId: string;
    type: string;
    isLoaderIgnored: boolean;
}

export interface ILoginParams {
    username: string;
    password: string;
    token?: string;
}

export interface IRequestPasswordResetParams {
    username: string;
}

export interface IPasswordResetParams {
    code: string | null;
    password: string;
}

export interface IConfirmAccountParams {
    code: string | null;
    password: string;
}
