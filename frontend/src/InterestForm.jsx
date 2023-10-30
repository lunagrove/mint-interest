import React from 'react';
import { useState } from "react";
import axios from 'axios';

const InterestForm = ({ onClose, onSubmitForm }) => {

  const apiUrl = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleCancel = (e) => {
    e.preventDefault();

    var submitButton = document.getElementById('submitBtn');
    var cancelButton = document.getElementById('cancelBtn');

    submitButton.classList.remove('focused');
    cancelButton.classList.add('focused');
    setEmail("");
    setFirstName("");
    setLastName("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail(e.target.value)
    if (email === "") {
      setError('Please enter an email address.');
      return;
    }

    var inputEmail = document.getElementById('email');
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      inputEmail.classList.add('invalid-email');
    }
    else {
      setError("");
      inputEmail.classList.remove('invalid-email');
      var submitButton = document.getElementById('submitBtn');
      var cancelButton = document.getElementById('cancelBtn');
      submitButton.classList.add('focused');
      cancelButton.classList.remove('focused');
      saveDetails();
      setEmail("");
      setFirstName("");
      setLastName("");
      onSubmitForm();
    }
  };

  const saveDetails = async () => {
    await axios.put(apiUrl + "/contact", {
      email: email,
      firstName: firstname,
      lastName: lastname
    })
    .then ((res) => {
      console.log(res.data.contact);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="interestmessage">Would you like to receive updates about the development of this app?</p>
      <input type="email"
             id="email"
             name="email"
             placeholder="Email address"
             onChange={(event) => setEmail(event.target.value)} />
      {error &&
        <div className="error">
          {error}
        </div>}
      <input type="text"
             id="firstname"
             name="firstname"
             placeholder="First name"
             onChange={(event) => setFirstName(event.target.value)} />
      <input type="text"
             id="lastname"
             name="lastname"
             placeholder="Last name"
             onChange={(event) => setLastName(event.target.value)} />
      <div className="buttonbar">
        <button type="submit"
                className="formbutton focused"
                id="submitBtn">Submit</button>
        <button type="button"
                className="formbutton"
                id="cancelBtn"
                onClick={handleCancel}>No thanks</button>
      </div> 
    </form>
  );
};

export default InterestForm;
