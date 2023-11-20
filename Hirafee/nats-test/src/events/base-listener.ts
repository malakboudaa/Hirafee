
import {Message, Stan} from 'node-nats-streaming';
import { Subjects } from './subjects';

// if our event has data, its going to be this in this subjects
interface Event {
  subject: Subjects;
  data: any;
}

// add an abstract class to easily create listners
// as a type "T"
export abstract class Listener <T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    abstract onMessage(data: T['data'], msg: Message): void;
    private client: Stan;
    protected ackWait = 5 * 1000;
  
    constructor(client: Stan) {
      this.client = client;
    }
  
    subscriptionOptions() {
      return this.client
        .subscriptionOptions()
        .setDeliverAllAvailable() //re Deliver all the list of emmitted events
        .setManualAckMode(true) // if anything goes wrong on our event we wont recieve any
        .setAckWait(this.ackWait)
        .setDurableName(this.queueGroupName);//set along with the precedent option to list durable subscriptions
          //nats will create a record to all durable subs that we will have
  
    }
  
    listen() {
      const subscription = this.client.subscribe(
        this.subject,
        this.queueGroupName,
        this.subscriptionOptions()
      );
  
      subscription.on('message', (msg: Message) => {
        console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);
  
        const parsedData = this.parseMessage(msg);
        this.onMessage(parsedData, msg);
      });
    }
  
    parseMessage(msg: Message) {
      const data = msg.getData();
      return typeof data === 'string'
        ? JSON.parse(data)
        : JSON.parse(data.toString('utf8'));
    }
  }