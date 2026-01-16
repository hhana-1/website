import AudioPlayer from '../components/Audio_player/Audio-player.jsx';

function Home() {
    return (
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
         <AudioPlayer />
      </div>
    );
  }
  
  export default Home;