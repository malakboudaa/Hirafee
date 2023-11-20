import { Publisher, GigCreatedEvent, Subjects } from "@hirafee-platforme/common/build";

export class GigCreatedPublisher extends Publisher <GigCreatedEvent> {
    subject: Subjects.GigCreated = Subjects.GigCreated;
}



