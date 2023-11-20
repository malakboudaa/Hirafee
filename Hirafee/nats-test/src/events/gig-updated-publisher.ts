import { Publisher } from "./base-pablisher";
import { GigUpdatedEvent } from "./gig-updated-event";
import { Subjects } from "./subjects";


export class GigUpdatedPublisher extends Publisher <GigUpdatedEvent>{
    subject: Subjects.GigUpdated = Subjects.GigUpdated;
}

