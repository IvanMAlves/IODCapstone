import "../App.css";
import React, { useState, useEffect } from "react";

const About = () => {
  return (
    <div>
      <h1 align="center" className="table-headings">
        About
      </h1>
      <div vertical-align="center">
        <div>
          <p align="center">
            Tabletop Bookkeeping is an application designed for tabletop wargamming and roleplaying players to have a single place to store<br />
            and manage their tabletop bookkeeping records. Many tabletop games come with a paper and pen component to the game. Most of these games<br />
            are multiplayer and require multiple people to have access to the same information and other information to be kept with only the<br />
            player. This application aims to take away the pen and paper and create a digital replacement where users can manage their own<br />
            informaiton and for future builds to shape how they want the informaiton stored.
          </p>
        </div>
        <div>
          <h1 className="table-headings" align="center">
            FAQ
          </h1>
        </div>
        <p align="center">
          
            <b>Q: Can I recover armies or units if I delete them?</b>
            <br />
            A: No, unfortunately there is no way to recover any armies or units
            you delete.
            <br />
            <b>Q: Where can I contact you if I have furthure questions?</b>
            <br />
            A: please feel free to email me on the following{" "}
            <a href="mailto:alves.ivan87@gmail.com">alves.ivan87@gmail.com</a>.
            <br />
        </p>
      </div>
      <br />
      <br />
      This is a project for the capstone of the Software Development Course for Institute of Data created and developed by Ivan Alves 2022.
    </div>
  );
};
export default About;
