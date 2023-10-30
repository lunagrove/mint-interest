import { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import InterestForm from './InterestForm';
import { getYear } from "./utilities/dates";

function App() {

  const [count, setCount] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
		fetchCount();
	}, [count]);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
    if (!isPanelOpen) {
      incrementCount();
      setIsButtonClicked(true);
      setTimeout(scrollToPanel, 500);
    }
  };

  const closePanel = () => {
    setMessage("Thanks for registering your interest!");
    setIsPanelOpen(false);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const handleSubmitForm = () => {
    setMessage("Thanks for registering your interest! We'll notify you of any product updates!");
    setIsPanelOpen(false);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const fetchCount = async () => {
    await axios.get(apiUrl + "/count").then ((res) => {
      setCount(parseInt(res.data.clickCount));
      console.log(res.data.clickCount);
    });
  };

  const incrementCount = async () => {
    await axios.put(apiUrl + "/count").then ((res) => {
      setCount(parseInt(res.data.clickCount));
      console.log(res.data.clickCount);
    });
  };

  const scrollToPanel = () => {
    const panelElement = document.querySelector(".panel");
    if (panelElement) {
      panelElement.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  return (
    <div className="App">

      <div className="wrapper">
        <div className="logo-container">
          <img className="logo-main" src="./logo-main.png" alt="Mint logo"></img>
        </div>
        <div className="text-container">
          <p>Tired of spending hours writing and rewriting your resume for every single job application?</p>
          <p>So are we!</p>
          <p>Mint is changing the way we organize our work experience, making it easy for job seekers like you to save resume-worthy work experience throughout your career.</p>
          <p>Tailor your application to a job posting in minutes, not hours.</p>
          <p>Mint allows you to record your work experience in bullet point form, anytime, anywhere. Tag the skills you’ve demonstrated, then remix your bullet points to create a perfectly tailored resume in seconds.</p>
        </div>
        <button className="interested-button"
                onClick={togglePanel}
                disabled={isButtonClicked}>I'm Interested!</button>
        {isPanelOpen ? (
          <div className="panel open">
            <InterestForm onClose={closePanel}
                          onSubmitForm={handleSubmitForm} />
          </div>
        ) : (
          <div className="panel hide">
            <InterestForm onClose={closePanel}
                          onSubmitForm={handleSubmitForm} />
          </div>
        )}
        {message && <p className="message-text">{message}</p>}
      </div>

      <footer>
        <p className="footer-text">&copy; {getYear()} holmesgroup</p>
      </footer>

    </div>
  )
}

export default App;
