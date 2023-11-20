import { Subjects } from "./subjects";

export interface GigUpdatedEvent {
    subject : Subjects.GigUpdated;
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