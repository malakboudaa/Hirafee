import { useState, useEffect } from "react";
import axios from "axios";

const Messages = ({ currentUser }) => {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(8);
  const [receiver, setReceiver] = useState("");
  const [objectMessage, setObjectMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/messages");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [count]);

  const indexOfLastMessage = currentPage * perPage;
  const indexOfFirstMessage = indexOfLastMessage - perPage;
  const currentMessages =
    data && data.slice(indexOfFirstMessage, indexOfLastMessage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSendMessage = () => {
    // Implement your logic to send the message using the receiver, objectMessage, and message values
    console.log("Sending message:", receiver, objectMessage, message);

    // Clear the input fields after sending the message
    setReceiver("");
    setObjectMessage("");
    setMessage("");
  };

  return (
    <main className="min-h-screen p-4 pt-16 flex justify-center">
      <div className="container flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-500 m-4">Message</h1>
        <div className="flex flex-col m-4 p-4 rounded-lg border w-fit">
          <div className="justify-center gap-4 flex flex-wrap">
            {currentMessages &&
              currentMessages.map((message) => (
                <div key={message.id} className="border rounded-lg">
                  <div className="p-4 flex flex-col gap-4 w-80">
                    <h1 className="text-2xl">
                      <span className="text-gray-500 font-bold">
                        {message.subject}
                      </span>
                    </h1>
                    <p className="text-gray-500">
                      <span className="font-bold">Sender: </span>
                      {message.sender}
                    </p>
                    <p className="text-gray-500">
                      <span className="font-bold">Receiver: </span>
                      {message.receiver}
                    </p>
                    <p className="text-gray-500">
                      <span className="font-bold">Content: </span>
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex justify-center mt-4">
            {data &&
              Array.from({ length: Math.ceil(data.length / perPage) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-2 py-1 mx-1 ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
          </div>

          <div className="mt-4 p-4 rounded-lg border w-fit">
            <h2 className="text-xl font-bold mb-4">Send a Message</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Receiver"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                className="border p-2 h-10 w-96"
              />
              <input
                type="text"
                placeholder="Object"
                value={objectMessage}
                onChange={(e) => setObjectMessage(e.target.value)}
                className="border p-2 h-10 w-96"
              />
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border p-2 h-32 w-96"
              ></textarea>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={handleSendMessage}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Messages;
