import React, { useState, useEffect } from "react";
import axios from "axios";
import Playlist from "./playlistCard";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayName, setUserId, logout } from "../store/stopifySlice";
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";
import Player from "./player";
export default function Homepage() {
  const [playlistData, setPlaylistData] = useState();
  const userData = useSelector((data) => data.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
      .then((resp) => setPlaylistData(resp.data.items))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div style={{color:"white"}}>
      Stopify'a Hoşgeldin
    </div>
  );
}
