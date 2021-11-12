import axios from "axios";
import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import {
  setPlaylistLen,
  addToQueue,
  setCurrentSong,
  cleanQueue,
} from "../store/stopifySlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
export default function Playlist(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const playPlaylist = () => {
    axios
      .get(`https://api.spotify.com/v1/playlists/${props.id}/tracks`, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((resp) => {
        dispatch(cleanQueue());
        dispatch(setPlaylistLen(0));
        dispatch(setPlaylistLen(resp.data.total));
        dispatch(addToQueue(resp.data.items.map((track) => track.track.uri)));
        dispatch(setCurrentSong());
        document.getElementsByClassName("rswp__toggle")[0].click();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Container style={{ color: "white" }}>
        <Card
          bg="dark"
          // style={{ width: "18rem" }}
          className="mb-2 playlistCard"
        >
          <Card.Img
            style={{ cursor: "pointer" }}
            src={props.imageSrc}
            alt="Playlist Image"
            onClick={() => {
              playPlaylist();
            }}
          />

          <Card.Body>
            <Card.Title
              className="playlistName"
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push(`/users/${props.userId}/playlists/${props.id}`);
              }}
            >
              {" "}
              {props.name}{" "}
            </Card.Title>
            <Card.Text className="playlistDescrp" style={{ cursor: "pointer" }}>
              {props.description}
            </Card.Text>
          </Card.Body>
          <Card.Footer
            onClick={() => {
              history.push(`/users/${props.ownerData.id}`);
            }}
            className="playlistOwner"
          >
            - {props.ownerData.display_name}
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
}