"use client"
import React, { useState } from 'react';
import { FaEnvelope, FaFacebook, FaInstagram, FaGooglePlusG, FaTwitter, FaCamera } from 'react-icons/fa';
import "@/styles/profilecard.css";

const ProfileCard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHoverActive, setIsHoverActive] = useState(false);

  const show = () => {
    setIsHoverActive(true);
    setIsModalVisible(true);
  };

  const hide = () => {
    setIsHoverActive(false);
    setIsModalVisible(false);
  };

  return (
    <div>
      {isModalVisible && (
        <div className="modal show">
          <img src="https://i.pinimg.com/736x/96/91/28/9691288a3fadba6a8e6173d4eea20488.jpg" alt="Profile" />
          <div className="close" onClick={hide}></div>
        </div>
      )}
      <div className="container">
        <div className="card">
          <div className="header">
            <a href="#" className="mail">
              <FaEnvelope />
            </a>
            <div className="main">
              <div
                className={`image ${isHoverActive ? 'active' : ''}`}
                style={{ backgroundImage: "url('https://i.pinimg.com/736x/96/91/28/9691288a3fadba6a8e6173d4eea20488.jpg')" }}
                onClick={show}
              >
                <div className="hover">
                  <FaCamera className="fa-2x" />
                </div>
              </div>
              <h3 className="name">Ali Ataie</h3>
              <h3 className="sub-name">@itsaliataie</h3>
            </div>
          </div>
          <div className="content">
            <div className="left">
              <div className="about-container">
                <h3 className="title">About</h3>
                <p className="text">
                  An aspiring Frontend Developer working with CSS / JavaScript / React
                </p>
              </div>
              <div className="icons-container flex flex-row gap-2 justify-center">
                <a href="#" className="icon">
                  <FaFacebook />
                </a>
                <a href="#" className="icon">
                  <FaInstagram />
                </a>
                <a href="#" className="icon">
                  <FaGooglePlusG />
                </a>
                <a href="#" className="icon">
                  <FaTwitter />
                </a>
              </div>
              <div className="buttons-wrap">
                <div className="follow-wrap">
                  <a href="#" className="follow">Follow</a>
                </div>
                <div className="share-wrap">
                  <a href="#" className="share">Share</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
