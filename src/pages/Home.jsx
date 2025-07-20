import TextScroll from "../components/TextScroll";

import HeartGridOverlay from "../modals/HeartGridOverlay"; 

function Home() {
    return (
      <div>
        <HeartGridOverlay />
      <div className="container01">
  
        
      <div className="cherry-papa"
       style={{
        display: 'flex',
        alignItems:'center',
        flexDirection:'column',
      }}>
        <img src="/cherry_picture.png"
         style={{
          width: "min(48vw, 580px)",
          minWidth: "100px",
          height: "auto",
          padding: "3% 0",
        }}
         />

         </div>
       <TextScroll />


       <div className="cherry-papa"
       style={{
        display: 'flex',
        alignItems:'center',
        flexDirection:'column',
      }}>
        <img src="/cherry_picture.png"
         style={{
          width: "min(48vw, 580px)",
          minWidth: "100px",
          height: "auto",
          padding: "3% 0",
        }}
         />

         </div>


    </div>

       </div>
    );
  }
  
  export default Home;