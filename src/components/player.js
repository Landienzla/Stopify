import React, { useEffect,useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useSelector } from "react-redux";
import { Navbar, Container } from "react-bootstrap";
export default function Player() {
  const [playerStatus,setPlayerStatus] = useState("bottom")
  const userData = useSelector((data) => data.userData);
  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      setPlayerStatus("top")
    }
    else{
      setPlayerStatus("bottom")
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
  }, []);
  return (
    <Navbar fixed={playerStatus}>
      <Container>
        <SpotifyPlayer
          token={userData.token}
          uris={[userData.currentSong]}
          name="Stopify Player"
          play={true}
          autoPlay={true}
          syncExternalDevice={true}
          magnifySliderOnHover={true}
          styles={{
            activeColor: "#fff",
            bgColor: "#191414",
            color: "#fff",
            loaderColor: "#fff",
            sliderColor: "#1cb954",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff",
          }}
        />
      </Container>
    </Navbar>
  );
}
