![alt text](https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)

# Hirafee Microservices

Hirafee is a microservices project designed to connect clients with craftsmen. The project allows craftsmen to create a profile, and clients to view those profiles and book gigs with the craftsmen they choose.

## Technologies Used

- Next.js
- Tailwind CSS
- MongoDB
- Docker
- Kubernetes
- Express
- Skaffold

## Installation

1. Clone the repository to your local machine using `git clone https://github.com/ZaouiAmine/hirafee.git`
2. Navigate to the project directory using `cd hirafee`
3. Install Skaffold using `curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 && chmod +x skaffold && sudo mv skaffold /usr/local/bin/`
4. Run the project using `skaffold dev`

## Microservices

The Hirafee project consists of the following microservices:

1. Auth Service - handles user authentication
2. Profile Service - manages the creation and management of user profiles
3. Gig Service - allows users to book gigs with craftsmen
4. Craftsmen Service - manages the creation and management of craftsmen profiles
5. Notification Service - handles email notifications to users
6. Payment Service - manages payments for booked gigs
7. Gateway Service - handles requests and routes them to the appropriate microservice

Each microservice is a separate Express application and is defined in its own `Dockerfile`.

## Deployment

The Hirafee microservices can be deployed to a Kubernetes cluster using the provided YAML files located in the `kubernetes` directory. To deploy the microservices, run the following command: `skaffold run`

## Usage

Once the project is running, clients can navigate to the web app and browse craftsmen profiles by profession. They can then book gigs with their preferred craftsmen. Craftsmen can create a profile, manage their profile details, and view gig bookings.

## Contributors

- ZaouiAmine
- malakboudaa

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
