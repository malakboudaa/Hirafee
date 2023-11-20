import axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      console.log("in do request try");
      return response.data;
    } catch (err) {
      setErrors(
        <div className="error-div">
          <h2 className="error-div-heading">Ooops ....</h2>
          <ul className="error-div-ul">
            {err.response?.data?.errors?.map((err) => (
              <li className="error-div-li" key={err.message}>
                {err.message}
              </li>
            ))}
          </ul>
        </div>
      );
      console.log("in do request catch");
    }
  };

  return { doRequest, errors };
};
