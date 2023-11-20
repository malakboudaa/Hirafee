import { Subjects } from "./subjects";

export interface GigCreatedEvent {
    subject : Subjects.GigCreated;
    data:
    {
        title: string,
        description: string,
        budget: string,
        location: string,
        category:string,
        requirements: string,
        banned: string
    };
}