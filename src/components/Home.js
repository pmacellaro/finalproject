import React from "react";
import './Home.css'
import { NavLink } from "react-router-dom";
export default function Home() {
    return (
        <body>
        <div class="box-canvas">
            <p className="flex flex-1 items-center justify-center font-bold">Hamish Welcomes You.</p>
          <div class="hoof left"></div>
          <div class="hoof right"></div>
          <div class="body"></div>
          <div class="cutout"></div>
          <div class="horn left"></div>
          <div class="horn right"></div>
          <div class="head">
            <div class="eye left"></div>
            <div class="eye right"></div>
            <div class="snoot">
              <div class="nostril left"></div>
              <div class="nostril right"></div>
            </div>
          </div>
          <div class="hair"></div>
          <div class="container">
          <NavLink to="/squish">
            <button className="skewBtn purple">Enter the Zoo?</button>
        </NavLink>
</div>
        </div>

      </body>
    )
}