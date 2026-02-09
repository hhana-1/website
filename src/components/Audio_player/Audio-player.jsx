import { useTheme } from "../../context/ThemeContext";
import "./Audio-player.css"; 
import { useEffect, useRef, useState } from "react";
import "./Audio-player.css";

//tasks:
//1 make content of player wait(timeout) to grow
//until div of player grows (offset 2-3 sec)
//so no elements jump around

//2 make text of track's artists more visible on light bg

//3 add onclick change of color of buttons play/pause/next
//4 add animated fadeoud to sound icon when volume is changed



//6 adjust for mobile screens by making player bigger for those chubby fingas


//8 adjust color themes and introduce theme toggle
//9 adjust color of theme changer so it is same gray as player div. 

const tracks = [
  {
    name: "Pick You Up",
    artist: "Shaznay Lewis. feat. Self Esteem",
    path: "/audio/Pick_You_Up_(feat._Self Esteem).mp3",
  },
  {
    name: "places to be",
    artist: "Anderson .Paak, Chika, and Fred Again",
    path: "/audio/Fred_again.._&_Anderson_.Paak_-_places_to_be_feat._Chika.mp3",
  },
  {
    name: "Looking at Your Pager",
    artist: "KH",
    path: "/audio/KH_-_Looking_at_Your_Pager.mp3",
  },
  {
    name: "Lush Life",
    artist: "Zara Larsson",
    path: "/audio/Zara_Larsson_-_Lush_Life.mp3",
  },
  {
    name: "Starships",
    artist: "Nicki Minaj",
    path: "/audio/Starships_-_Nicki_Minaj.mp3",
  },
  {
    name: "Discoproof",
    artist: "La Roux X Chromeo",
    path: "/audio/La_Roux_X_Chromeo_-_Discoproof.mp3",
  },
  {
    name: "Morenita",
    artist: "Hugel feat. Cumbiafrica",
    path: "/audio/Hugel_-_Morenita_-_feat._Cumbiafrica.mp3",
  },
   {
    name: "Push Thru",
    artist: "The Grey Room _ Golden Palms",
    path: "/audio/Push Thru - The Grey Room _ Golden Palms.mp3",
  },
   {
    name: "Van Life Rager",
    artist: "Everet Almond",
    path: "/audio/Van Life Rager - Everet Almond.mp3",
  },
];

function AudioPlayer() {
  const audioRef = useRef(new Audio());

  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTrack, setActiveTrack] = useState(0);
  const [initPlay, setInitPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seek, setSeek] = useState(0);
  const [volume, setVolume] = useState(4);
  const [prevVolume, setPrevVolume] = useState(4);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isShuffle, setIsShuffle] = useState(false);
  const { theme } =
   useTheme();
  

  // load track
  useEffect(() => {
    const audio = audioRef.current;
    audio.src = tracks[activeTrack].path;

    if (initPlay) audio.play();
  }, [activeTrack]);

  // audio events
  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => {
      setSeek((audio.currentTime / audio.duration) * 100 || 0);
      setCurrentTime(formatTime(audio.currentTime));
    };

    const onLoadedMetadata = () => {
      setDuration(formatTime(audio.duration));
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = nextTrack;

    audio.volume = volume / 50;

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);




//this code snippet to unlock audio on user interaction izi peasy
  useEffect(() => {
    const unlockAudio = () => {
      const audio = audioRef.current;
      audio.muted = false; 
  
      audio.play()
        .then(() => {
          // THIS IS THE KEY:
          // Once the first play succeeds, we set initPlay to true 
          // so that future tracks load and play automatically.
          setInitPlay(true); 
        })
        .catch(err => console.log("Still blocked:", err));

      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
    
    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []); // Empty array ensures this only runs once on mount


  // controls
  const playPauseTrack = () => {
    const audio = audioRef.current;
    audio.paused ? audio.play() : audio.pause();
    if (!initPlay) setInitPlay(true);
  };

 const nextTrack = () => {
  if (isShuffle) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * tracks.length);
    } while (randomIndex === activeTrack && tracks.length > 1);
    setActiveTrack(randomIndex);
  } else {
    setActiveTrack((prev) => (prev + 1) % tracks.length);
  }
};

  const prevTrack = () =>
    setActiveTrack((prev) => (prev - 1 + tracks.length) % tracks.length);

  const handleSeek = (e) => {
    const value = e.target.value;
    const audio = audioRef.current;
    audio.currentTime = (value / 100) * audio.duration;
    setSeek(value);
  };

  const handleVolume = (e) => {
    const value = e.target.value;
    audioRef.current.volume = value / 100;
    setVolume(value);
  };

  const toggleMute = () => {
  if (volume > 0) {
    setPrevVolume(volume); // Save current volume
    setVolume(0);          // Mute
  } else {
    setVolume(prevVolume > 0 ? prevVolume : 20); // Restore or set a default
  }
};

  return ( 
      <div className={`player ${isMinimized ? "minimized" : ""}`}>
  {!isMinimized ? (
        <div className="full-player-content">
          {/* Top Right Minimize/Expand Button */}
          <div className="title-bar">
            <button 
              className="minimize-btn" 
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <i className={`bi ${isMinimized ? "bi-window-fullscreen" : "bi-dash-lg"}`}></i>
            </button>
          </div>
    
      <div className={`track-info ${theme}`}>
        <h2 className={`name ${theme}`}>{tracks[activeTrack].name}</h2>
        <h3 className={`artist ${theme}`}>{tracks[activeTrack].artist}</h3>
       
      </div>
      <div className="seek-bar-container">
           <span className="current-time">{currentTime}</span>
        <input
          className="seek-bar"
          type="range"
          min="0"
          max="100"
          value={seek}
          step="any"
          onChange={handleSeek}
        />
          <span className="duration">{duration}</span>
          </div>

      <div className="audio-n-volume-ctlr">
  <div className="audio-controls">
        <button className="prev" onClick={prevTrack}>
          <i className="bi bi-skip-start-fill"></i>
        </button>

        <button className={`play-pause ${isPlaying ? "" : "paused"}`} onClick={playPauseTrack}>
          <i className={`bi ${isPlaying ? "bi-pause-circle-fill" : "bi-play-circle-fill"}`}></i>
        </button>

        <button className="next" onClick={nextTrack}>
            <i className="bi bi-skip-end-fill"></i>
        </button>
        
        <button 
          className={`shuffle ${isShuffle ? "active" : ""}`} 
          onClick={() => setIsShuffle(!isShuffle)}
              >
          <i className="bi bi-shuffle"></i>
      </button>
    </div>
    
   <div className="volume-control">
        <i className={`volume-icon bi ${volume == 0 ? 'bi-volume-mute-fill' : 
        volume <= 35 ? 'bi-volume-down-fill'
        : 'bi-volume-up-fill'}`}
        onClick={toggleMute}
        style={{cursor: "url('/vintage0pointer.svg'), auto"}}>
        </i>
        <input
          className="volume-bar"
          type="range"
          min="0"
          max="50"
          value={volume}
          step="any"
          onChange={handleVolume}
        />
 </div>
      </div>
      </div>
  ): (
        /* Minimized Bar State */
        <div className="mini-bar-content">
          {/* Top Right Minimize/Expand Button */}
          <div className="title-bar">
            <button 
              className="minimize-btn" 
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <i className={`bi ${isMinimized ? "bi-window-fullscreen" : "bi-dash-lg"}`}></i>
            </button>
          </div>
              
        <button className="prev" onClick={prevTrack}>
          <i className="bi bi-skip-start-fill"></i>
        </button>
        <button className={`play-pause ${isPlaying ? "" : "paused"}`} onClick={playPauseTrack}>
          <i className={`bi ${isPlaying ? "bi-pause-circle-fill" : "bi-play-circle-fill"}`}></i>
        </button>
        <button className="next" onClick={nextTrack}>
            <i className="bi bi-skip-end-fill"></i>
        </button>
        </div>
      )}
    </div>
  );
}

export default AudioPlayer;

// utils
function formatTime(time = 0) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
