import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";
import { resolve } from "path";
import { rejects } from "assert";

interface Event {
  subject: Subjects;
  data: any;
}
export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];
  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }
  //a function that will take the data that we want to publish
  publish( data:T['data']): Promise<void> {
    return new Promise((resolve,reject)=> {
        this.client.publish(this.subject, JSON.stringify(data), (err) => {
            if (err) {
                return reject(err)
            }
            console.log("Event Published successfully to subject", this.subject)
            resolve();

        });
    });

  }
}
