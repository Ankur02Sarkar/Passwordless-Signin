import React from 'react'
import "@/styles/profilecard.css"
const ProfileCard = () => {
  return (
    <div>
      <div class="modal">
        <img src="img.JPG" alt="" />
        <div class="close"></div>
      </div>
      <div class="container">
        <div class="card">
          <div class="header">
            <div class="hamburger-menu">
              <div class="center"></div>
            </div>
            <a href="#" class="mail">
              <i class="far fa-envelope"></i>
            </a>
            <div class="main">
              <div class="image">
                <div class="hover">
                  <i class="fas fa-camera fa-2x"></i>
                </div>
              </div>
              <h3 class="name">Ali Ataie</h3>
              <h3 class="sub-name">@itsaliataie</h3>
            </div>
          </div>
          <div class="content">
            <div class="left">
              <div class="about-container">
                <h3 class="title">About</h3>
                <p class="text">
                  An aspiring Frontend Developer working with CSS
                  / JavaScript / React
                </p>
              </div>
              <div class="icons-container">
                <a href="#" class="icon">
                  <i class="fab fa-facebook"></i>
                </a>
                <a href="#" class="icon">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="icon">
                  <i class="fab fa-google-plus-g"></i>
                </a>
                <a href="#" class="icon">
                  <i class="fab fa-twitter"></i>
                </a>
              </div>
              <div class="buttons-wrap">
                <div class="follow-wrap">
                  <a href="#" class="follow">Follow</a>
                </div>
                <div class="share-wrap">
                  <a href="#" class="share">Share</a>
                </div>
              </div>
            </div>
            <div class="right">
              <div>
                <h3 class="number">91</h3>
                <h3 class="number-title">Posts</h3>
              </div>
              <div>
                <h3 class="number">2.4K</h3>
                <h3 class="number-title">Following</h3>
              </div>
              <div>
                <h3 class="number">4.7K</h3>
                <h3 class="number-title">Followers</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
