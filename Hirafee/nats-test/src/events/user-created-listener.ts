import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subjects";
import { UserCreatedEvent } from "./user-created-event";

export class UserCreatedListener extends Listener <UserCreatedEvent> {
    subject: Subjects.UserCreated= Subjects.UserCreated ;
    queueGroupName= 'profile-service'; 

    onMessage(data: UserCreatedEvent['data'], msg: Message): void {

      console.log('Event data!!!', data);
      console.log(data.email)
      console.log(data.lastName)
      console.log(data.firstName)
      console.log(data.phoneNumber)
      console.log(data.location)
      console.log(data.biography)
      console.log(data.categorie)

      msg.ack(); //acknowledge incoming msgs
    } 
  }
  