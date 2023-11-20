import { Publisher, GigUpdatedEvent, Subjects } from "@hirafee-platforme/common/build";

export class GigUpdatedPublisher extends Publisher <GigUpdatedEvent> {
    subject: Subjects.GigUpdated = Subjects.GigUpdated;
}



