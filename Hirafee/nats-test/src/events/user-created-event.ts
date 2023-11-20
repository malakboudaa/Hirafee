import { Subjects } from "./subjects";

export interface UserCreatedEvent {
    subject : Subjects.UserCreated;
    data:
    {
        email: string;
        firstName: string,
        lastName: string,
        phoneNumber: string,
        location: string,
        biography: string,
        categorie: string
    };
}