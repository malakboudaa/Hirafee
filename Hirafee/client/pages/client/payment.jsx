import React, { useState } from "react";
import axios from "axios";

const Payment = () => {
  const [amount, setAmount] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");

  const handlePayment = async () => {
    try {
      // Make an API call to process the payment
      const response = await axios.post("/api/payments", {
        amount,
        cardNumber,
        expirationDate,
        cvv,
      });

      // Handle the response and perform necessary actions
      console.log("Payment processed:", response.data);

      // Clear the input fields after processing the payment
      setAmount(0);
      setCardNumber("");
      setExpirationDate("");
      setCVV("");
    } catch (error) {
      // Handle error if payment processing fails
      console.error("Payment processing failed:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Payment Interface</h1>
      <div className="border rounded-lg p-4">
        <div className="mb-4">
          <label htmlFor="amount" className="block font-medium mb-2">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block font-medium mb-2">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="expirationDate" className="block font-medium mb-2">
            Expiration Date
          </label>
          <input
            type="text"
            id="expirationDate"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cvv" className="block font-medium mb-2">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCVV(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
