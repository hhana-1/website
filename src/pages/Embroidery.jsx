import React, { useRef, useEffect } from "react";
import "./Embroidery.css";
import { useTheme } from "../context/ThemeContext";


function Embroidery() {

const { theme } = useTheme();


  return (
    <>
      <div className="container01">
        <h1>Embroidery</h1>
<div className={`emb-div ${theme}`}>
 
<div class={`emb-cont-div ${theme}`}>

<img
          className="flower-on-top"
          src="/embroidery/emb-flower.png"
          alt="flower embroidery"
        />
    

      <img
          className="flower-on-top2"
          src="/embroidery/emb-flower.png"
          alt="flower embroidery"
        />

  <p className='emb-text1'>One of my absolute favorite things in the world is embroidery. There is nothing that I enjoy more than seeing results of my work, and leaving trace with tread and needle gives me that dopamine hit. It is contemporary and hella ancient at the same time. I can give a statement, and craft a craft. Plus many people can't do it, and I can. Spice it up with little typography that I started developing since I was 13, and there you have it.</p>

       
       </div>


          <div className={`griddy ${theme}`}>

          <div className={`one ${theme}`}>
            {/* <p>Text goes here..</p> */}
       
          <img
          className="tiger"
          src="/embroidery/djerdjef-tigar.png"
          alt="tiger embroidery"
        />
        {/* <p>More text here...</p> */}
          </div>
          </div>
         
       
        </div>
      </div>
    
    </>
  );
}

export default Embroidery;
