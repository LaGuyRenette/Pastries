export enum Status {
    Admin = 'admin',
    Client = 'client'
}

export interface User {
    name: string;
    email: string;
    address: string;
    status: Status;
}