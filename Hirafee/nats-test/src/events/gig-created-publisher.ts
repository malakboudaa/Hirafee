import { Publisher } from "./base-pablisher";
import { GigCreatedEvent } from "./gig-created-event";
import { Subjects } from "./subjects";


export class GigCreatedPublisher extends Publisher <GigCreatedEvent>{
    subject: Subjects.GigCreated = Subjects.GigCreated;
}

