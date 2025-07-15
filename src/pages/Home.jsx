import TextScroll from "../components/TextScroll";

function Home() {
    return (
      <div>
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
        
      </div>
       <TextScroll />
       </div>
    );
  }
  
  export default Home;