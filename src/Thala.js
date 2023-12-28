import React, { useState } from 'react';
import './App.css';
import Dhoni from './dhoni.jfif';
import moye from './moyemoye.mp3';
import koyal from './bolejokoyal.mp3';
import thala from './thala.mp4';
import sad from './sad.mp4';

const Thala = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [text, settext] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showModal) {
      return; // Ignore button click when the modal is open
    }

    // Check if the entered value is a number
    const isNumber = !isNaN(search);

    // Show the modal
    setShowModal(true);

    // Check conditions for playing video and audio
    if ((search.length === 7 && !isNumber) || (isNumber && getDigitSum(search) === 7)) {
      // Play first video and audio
      playAudio(koyal, thala);
      settext(" You Guessed Correct! Thala For A Reason");
    } else {
      // Play second video and audio
      playAudio(moye, sad);
      settext(" You Missed It! Hint: Sum");
    }
    setSearch('')
  };

  // Function to calculate the sum of digits in a number
  const getDigitSum = (num) => {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  };

  // Function to play audio and video
  const playAudio = (audioFile, videoFile) => {
    const audio = new Audio(audioFile);
    setSelectedVideo(videoFile);

    // Play the audio
    audio.play();

    // Automatically close the modal and pause the audio after 10 seconds
    const timeoutId = setTimeout(() => {
      setShowModal(false);
      audio.pause();
    }, 10000); // 10 seconds

    // Store the timeoutId to clear the timeout if the audio ends before 10 seconds
    audio.timeoutId = timeoutId;

    // Add an event listener to pause the audio and clear the timeout if it ends before 10 seconds
    audio.addEventListener('ended', () => {
      setShowModal(false);
      audio.pause();
      clearTimeout(audio.timeoutId);
    });
  };

  return (
    <div className='main'>
      <div className='top'>
        <h1>Thala For A Reason System</h1>
        <h3>This WebApp Made with love and dedicated to the legendary cricketer <span>M.S DHONI</span></h3>
      </div>
      <div className='container'>
        <img src={Dhoni} alt="MS Dhoni" />
        <form onSubmit={handleSubmit}>
          <label htmlFor='search'>Enter Text or Number:</label>
          <input
            placeholder='Thala for a reason'
            value={search}
            onChange={handleChange}
            required
            type='text'
            name='search'
            id='search'
          />
          <button type='submit'>Check</button>
        </form>
        <div className="icons">
          <a
            href="https://github.com/mukulpythondev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-github-fill icon"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/mukul-webdev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-linkedin-box-fill icon"></i>
          </a>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          {/* Add your video player component or embed video here */}
          <video controls={false} autoPlay loop>
            <source src={selectedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
         
          <p>{text}</p>
         
        </div>
      )}
    </div>
  );
};

export default Thala;
