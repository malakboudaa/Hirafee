import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subjects";
import { GigUpdatedEvent} from "./gig-updated-event";

export class GigUpdatedListener extends Listener <GigUpdatedEvent> {
    subject: Subjects.GigUpdated= Subjects.GigUpdated ;
    queueGroupName= 'profile-service'; 

    onMessage(data: GigUpdatedEvent['data'], msg: Message): void {

      console.log('Event data!!!', data);
      console.log(data.title)
      console.log(data.description)
      console.log(data.budget)
      console.log(data.location)
      console.log(data.category)
      console.log(data.requirements)
      console.log(data.banned)

      msg.ack(); //acknowledge incoming msgs
    } 
  }
  