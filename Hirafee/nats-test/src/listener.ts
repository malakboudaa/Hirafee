import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { UserCreatedListener } from './events/user-created-listener';
import { GigCreatedListener } from './events/gig-created-listener';
import { GigUpdatedListener } from './events/gig-updated-listener';


console.clear();

//connect to NATS (stan refers to client)
const stan = nats.connect('hirafee', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

// disconect from the running server 
stan.on('close', () =>{
  console.log('NATS connection closed');
  process.exit();
   });

   new UserCreatedListener(stan).listen();
   new GigCreatedListener(stan).listen();
   new GigUpdatedListener(stan).listen();


});

//add two handlers to handle the close of the process
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close()); 




