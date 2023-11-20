import { Publisher } from "./base-pablisher";
import { UserCreatedEvent } from "./user-created-event";
import { Subjects } from "./subjects";


export class UserCreatedPublisher extends Publisher <UserCreatedEvent>{
    subject: Subjects.UserCreated = Subjects.UserCreated;
}

