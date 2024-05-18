"use client";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaCamera,
  FaYoutube,
} from "react-icons/fa";
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

  const [userObj, setUserObj] = useState({
    name: "Ankur Sarkar",
    username: "itsaliataie",
    email: "ankur02sarkar@gmail.com",
    image:
      "https://i.pinimg.com/736x/96/91/28/9691288a3fadba6a8e6173d4eea20488.jpg",
    bio: "An aspiring Frontend Developer working with CSS / JavaScript / React",
    facebook: "https://www.facebook.com/Ank.Sar.02",
    insta: "https://www.instagram.com/black_hat.hades/",
    youtube: "https://youtube.com/@ankur02sarkar",
    twitter: "https://twitter.com/ankur02sarkar",
  });

  return (
    <div>
      {isModalVisible && (
        <div className="modal show">
          <img
            src={
              userObj?.image ||
              "https://i.pinimg.com/736x/96/91/28/9691288a3fadba6a8e6173d4eea20488.jpg"
            }
            alt="Profile"
          />
          <div className="close" onClick={hide}></div>
        </div>
      )}
      <div className="profile-container">
        <div className="card">
          <div className="header">
            <a
              href={`mailto:${userObj?.email || "lorem@ipsum.com"}`}
              className="mail"
            >
              <FaEnvelope />
            </a>
            <div className="main">
              <div
                className={`image ${isHoverActive ? "active" : ""}`}
                style={{
                  backgroundImage: `url('${
                    userObj?.image ||
                    "https://i.pinimg.com/736x/96/91/28/9691288a3fadba6a8e6173d4eea20488.jpg"
                  }')`,
                }}
                onClick={show}
              >
                <div className="hover">
                  <FaCamera className="fa-2x" />
                </div>
              </div>
              <h3 className="name">{userObj?.name || "Lorem Ipsum"}</h3>
              <h3 className="sub-name">@{userObj?.username || "loremipsum"}</h3>
            </div>
          </div>
          <div className="content">
            <div className="left">
              <div className="about-container">
                <h3 className="title">About</h3>
                <p className="text">
                  {userObj?.bio || "Lorem Ipsum dolor met"}
                </p>
              </div>
              <div className="icons-container flex flex-row gap-2 justify-center">
                <a
                  href={userObj?.facebook || "#"}
                  target="_blank"
                  className="icon"
                >
                  <FaFacebook />
                </a>
                <a
                  href={userObj?.insta || "#"}
                  target="_blank"
                  className="icon"
                >
                  <FaInstagram />
                </a>
                <a
                  href={userObj?.youtube || "#"}
                  target="_blank"
                  className="icon"
                >
                  <FaYoutube />
                </a>
                <a
                  href={userObj?.twitter || "#"}
                  target="_blank"
                  className="icon"
                >
                  <FaTwitter />
                </a>
              </div>
              <div className="buttons-wrap">
                <div className="follow-wrap">
                  <a href="#" className="follow">
                    Follow
                  </a>
                </div>
                <div className="share-wrap">
                  <a href="#" className="share">
                    Share
                  </a>
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
