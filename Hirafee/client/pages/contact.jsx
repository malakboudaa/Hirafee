const contact = () => {
  return (
    <main className="min-h-screen  pt-16 flex justify-center">
      <section className="container flex flex-col items-center p-4 py-16 ">
        <div className="max-w-272 w-full">
          <h1 className="text-5xl my-12 text-secondary font-semibold text-center">
            Contact Us
          </h1>
          <div className="max-w-lg mx-auto">
            <form
              action="mailto:aminedazaoui@gmail.com"
              method="POST"
              encType="text/plain"
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-800 font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-800 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-800 font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  rows="5"
                  required
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-secondary text-white hover:text-secondary border border-secondary px-6 py-3 rounded-full hover:bg-white transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
export default contact;
