import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";
import { setCurrentSong } from "../store/stopifySlice";
import { useDispatch } from "react-redux";
import { Container, ListGroup, Badge, Button, Image } from "react-bootstrap";
export default function PlaylistDetail() {
  const userData = useSelector((data) => data.userData);
  const dispatch = useDispatch();
  const history = useHistory();
  const [playlistDetails, setDetails] = useState();
  const [tracks, setTracks] = useState();
  const [cursor, setCursor] = useState("default");
  const { playlistId } = useParams();
  function playTrack(id, uri) {
    dispatch(setCurrentSong(uri));
    document.getElementsByClassName("rswp__toggle")[0].click();
  }
  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
      .then((resp) => {
        setTracks(resp.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
      .then((resp) => {
        setDetails(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Container>
      {playlistDetails && (
        <div
          className="d-flex justify-content-center"
          style={{ color: "white" }}
        >
          <Image
            src={playlistDetails.images[0].url}
            rounded
            width="200px"
            height="200px"
          />
          <div className="d-flex justify-content-center">
            <span className="ms-5">
              <div>
                <p style={{ fontFamily: "serif", fontSize: "24px" }}>
                  {playlistDetails.name}
                </p>
              </div>
              <div>
                <p>{playlistDetails.description}</p>
              </div>
              <div className="d-flex justify-content-end">
                <span>
                  <p
                    onClick={() => {
                      history.push(`/users/${playlistDetails.owner.id}`);
                    }}
                  >
                    {" "}
                    {playlistDetails.owner.display_name}
                  </p>
                  <p> {playlistDetails.followers.total} Followers</p>
                </span>
              </div>
            </span>
          </div>
        </div>
      )}

      {tracks && (
        <ListGroup>
          {tracks.items.map((track) => (
            <ListGroup.Item
              style={{ backgroundColor: "#6d8174" }}
              as="li"
              className="m-1 d-flex justify-content-between align-items-start"
            >
              <Image
                src={track.track.album.images[0].url}
                width="80px"
                height="80px"
              />
              <div className="">
                <div className="fw-bold">{track.track.name}</div>
                {track.track.artists.map((artist) => artist.name)}
              </div>
              <Badge
                pill
                bg="dark"
                style={{ cursor: cursor }}
                onClick={() => {
                  playTrack(track.track.id, track.track.uri);
                }}
                onMouseEnter={() => {
                  setCursor("pointer");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-play"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                </svg>
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}
