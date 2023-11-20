import Image from "next/image";
import profile from "@/public/landingpage/ourpics.png";

const About = () => {
  return (
    <main className="min-h-screen ">
      <section className="container flex flex-col items-center p-4 py-16 mx-auto  ">
        <h1 className="text-5xl my-12 text-secondary font-semibold ">
          ABOUT US
        </h1>
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          <div className="flex flex-col justify-center w-full lg:w-1/2 p-8">
            <h1 className="text-3xl">Who are we ?</h1>
            <p className="text-gray-500 font-normal text-justify">
              We are two students working on our master's thesis, passionate
              about connecting clients and artisans. Introducing Hirafee, our
              platform aims to revolutionize the way people find and collaborate
              with skilled artisans. Join us on this exciting journey to shape
              the future of artisan-client interactions.
            </p>
          </div>
          <div className=" w-full lg:w-1/2 flex justify-center">
            <Image src={profile} width={300} />
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap items-center justify-center mb-12">
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <img
              src="/artisans-working.jpg"
              alt="Artisans working"
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-2/3 p-4">
            <h1 className="text-3xl ">Welcome to our platform!</h1>
            <p className="text-gray-500 font-normal text-justify">
              We are a dedicated platform that connects artisans, including
              plumbers, electricians, and various skilled workers, with clients
              who need their services. Our goal is to make it easier for clients
              to find the perfect artisans for their projects.
            </p>
            <p className="text-gray-500 font-normal text-justify">
              Our platform allows clients to post gigs in specific categories,
              such as plumbing, electrical work, carpentry, and more. Artisans
              can create portfolios showcasing their work, skills, and
              expertise, which clients can browse and evaluate before making a
              decision.
            </p>

            <p className="text-gray-500 font-normal text-justify">
              Join our platform today and discover the endless possibilities of
              connecting with talented artisans or finding the perfect client
              for your skills. Whether you're a homeowner, business owner, or
              contractor, our platform offers a convenient way to connect and
              collaborate with skilled artisans in your area.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap flex-row-reverse items-center justify-center">
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <img
              src="/artisan-working.jpg"
              alt="Artisan working"
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-2/3 p-4">
            <h1 className="text-3xl">Our Vision</h1>
            <p className="text-gray-500 font-normal text-justify">
              We aspire to create a platform that celebrates artisans and their
              exceptional skills. We envision a world where artisans are valued
              for their craftsmanship and have the opportunity to showcase their
              talents. Through our platform, we aim to connect artisans with
              clients who appreciate their work, fostering a community that
              promotes innovation, creativity, and meaningful collaborations.
              Our vision is to empower artisans and elevate their contributions,
              making a positive impact on the industry and enriching the lives
              of both artisans and clients alike.
            </p>
            <h1 className="text-3xl">Our Mission</h1>
            <p className="text-gray-500 font-normal text-justify">
              To connect clients with skilled artisans and provide a platform
              that fosters collaboration, innovation, and exceptional
              craftsmanship. We strive to simplify the process of finding the
              perfect artisan for each project, promoting local talent, and
              ensuring client satisfaction. By facilitating meaningful
              connections and supporting artisans in their professional journey,
              we aim to revolutionize the way clients and artisans collaborate,
              creating remarkable outcomes that inspire and leave a lasting
              impact.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
