import { Publisher, UserCreatedEvent, Subjects } from "@hirafee-platforme/common/build";

export class UserCreatedPublisher extends Publisher <UserCreatedEvent> {
    subject: Subjects.UserCreated = Subjects.UserCreated;
}



