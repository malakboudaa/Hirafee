import nats from 'node-nats-streaming';
import { UserCreatedPublisher } from './events/user-created-publisher';

console.clear();
const stan = nats.connect('hirafee', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');


  const publisher = new UserCreatedPublisher(stan);
try {

  await publisher.publish({
    email: 'hirafee@hirafee.com',
    firstName: 'hirafeee',
    lastName: 'hir',
    phoneNumber: '0556882069',
    location: 'Constantine',
    biography: 'Je suis paintre expérimenté ',
    categorie: 'Painting'
  });

} catch (err) {
  console.error(err);
}




  // const data = JSON.stringify ({
  //   userId: '1',
  //   firstName: 'malak',
  //   lastName: 'boudaa',
  //   phoneNumber: '0556882069',
  //   location: 'Constantine',
  //   biography: 'Je suis paintre expérimenté ',
  //   categorie: 'Painting'

  // });

  // stan.publish('user:created', data, ()=> {
  //   console.log ('Event published')
  // });

});
