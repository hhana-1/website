'use client';

import { useRef, useEffect } from "react";
import { useScroll } from "framer-motion";
import "./TextScroll.css"; 

export default function TextScroll() {
  const container = useRef(null);

  const texts = useRef ([]);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 65%", "end 95%"],
  });




useEffect ( () => {

    scrollYProgress.on( 'change', e => {
        texts.current.forEach ( (text, i) => {
            text.setAttribute('startOffset', -43.5  + (i * 50) + (e *50 ) +"%" );

        })
    }
    )


} )




  return (
<div className="text-scroll-daddy" style= {{ width: "100%", display:"flex", justifyContent:"center", alignItems:"center"}}>

<div ref={container} className="text-scroll" style={{ width:"50%"}}>
      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 66.999999 67" >
        <g transform="translate(-77.935818,-90.55479)">
        <path
          id="curved-text"
          d="m -91.99387,-123.36928 a 19.454018,19.454018 0 0 1 -20.11834,18.75675 19.454018,19.454018 0 0 1 -18.76617,-20.10956 19.454018,19.454018 0 0 1 20.10078,-18.77558 19.454018,19.454018 0 0 1 18.784979,20.09199"

          transform="scale(-1)" 
         
        // stroke='black'
        fill='none'
          strokeWidth="0.264583"
     
          strokeOpacity="1"
        />
 

        <text>
          {[...Array(2)].map((_, i) => (
            <textPath ref={ref => texts.current[i] = ref } key={i} href="#curved-text" startOffset={`${i * 50}%`}>
           welcome
            </textPath>
          ))}
        </text>
        </g>
      </svg>
  </div>
    </div>
  );
}
