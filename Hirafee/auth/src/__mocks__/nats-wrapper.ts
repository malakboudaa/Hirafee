export const natsWrapper = {

    client: {
        publish: (subject: string, data: string, callback: ()=> void ) =>{
            callback ();
            }
        }
        
    }; //fake nats client we do not want to our test files to access to the real nats  client 