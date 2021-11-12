import React, { useEffect, useState } from "react";
import { Col, Container, Row, Image, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  setCurrentSong,
  cleanQueue,
  setPlaylistLen,
  addToQueue,
} from "../store/stopifySlice";
import axios from "axios";
export default function User() {
  const [user, setUser] = useState();
  const [topItems, setTopItems] = useState();
  const [playlists, setPlaylists] = useState();
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((data) => data.userData);
  const playPlaylist = (playlistId) => {
    axios
      .get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
      .then((resp) => {
        dispatch(cleanQueue()); 
        dispatch(setPlaylistLen(0));
        dispatch(setPlaylistLen(resp.data.total));
        dispatch(addToQueue(resp.data.items.map((track) => track.track.uri)));
        dispatch(setCurrentSong());
        document.getElementsByClassName("rswp__toggle")[0].click(); //oynatıcının otomatik şarkıyı başlatması için
      })
      .catch((err) => console.log(err));
  };
  function playTrack(id, uri) {
    dispatch(setCurrentSong(uri));
    document.getElementsByClassName("rswp__toggle")[0].click();
  }
  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/users/${id}`, {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
      .then((resp) => {
        setUser(resp.data);
        console.log(resp.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(`https://api.spotify.com/v1/me/top/tracks?time_range=medium_term`, {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
      .then((resp) => {
        setTopItems(resp.data);
      })
      .catch((err) => console.log(err));
    if (id !== userData.userId) {
      axios
        .get(`https://api.spotify.com/v1/users/${id}/playlists`, {
          headers: {
            Authorization: "Bearer " + userData.token,
          },
        })
        .then((resp) => {
          setPlaylists(resp.data.items);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div>
      <Container style={{ color: "white" }}>
        {user && (
          <div className="m-1 d-flex justify-content-start align-items-start">
            <span className="me-5">
              <Image src={user.images[0].url} rounded></Image>
            </span>
            <span className="ms-5 mt-5">
              {" "}
              <h1 className="m-5">{user.display_name}</h1>
              <p style={{ color: "green" }} className="ms-5">
                {user.followers.total} Followers{" "}
              </p>
            </span>
          </div>
        )}
        <Row>
          {user && user.id === userData.userId && <h4>En Çok Dinlediklerin</h4>}
          {user &&
            user.id === userData.userId &&
            topItems &&
            topItems.items.map((track) => (
              <Col xs="2">
                <Card bg="dark" className="mb-2 playlistCard">
                  <Card.Img
                    style={{ cursor: "pointer" }}
                    src={track.album.images[0].url}
                    alt="Playlist Image"
                    onClick={() => {
                      playTrack(track.id, track.uri);
                    }}
                  />

                  <Card.Body>
                    <Card.Title
                      className="playlistName"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        playTrack(track.id, track.uri);
                      }}
                    >
                      {" "}
                      {track.name}{" "}
                    </Card.Title>
                  </Card.Body>
                  <Card.Footer className="playlistOwner">
                    - {track.artists.map((artist) => artist.name)}
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          {user &&
            user.id !== userData.userId &&
            playlists &&
            playlists.map((playlist) => (
              <Col xs="2">
                <Card bg="dark" className="mb-2 playlistCard">
                  <Card.Img
                    style={{ cursor: "pointer" }}
                    src={playlist.images[0].url}
                    alt="Playlist Image"
                    onClick={() => {
                      playPlaylist(playlist.id);
                    }}
                  />

                  <Card.Body>
                    <Card.Title
                      className="playlistName"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        history.push(`/users/${id}/playlists/${playlist.id}`);
                      }}
                    >
                      {" "}
                      {playlist.name}{" "}
                    </Card.Title>
                    <Card.Text
                      className="playlistDescrp"
                      style={{ cursor: "pointer" }}
                    >
                      {playlist.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}
