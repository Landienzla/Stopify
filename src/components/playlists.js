import React, { useState, useEffect } from "react";
import axios from "axios";
import Playlist from "./playlistCard";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

export default function Playlists() {
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
    <div>
      <Container>
        <Row>
          <Col style={{ color: "white" }}></Col>
        </Row>
      </Container>
      <Row>
        {playlistData &&
          playlistData.map((playlist) => (
            <Col xs="2">
              {/* Playlistler için figma üzerinden tasarım yapmıştım fakat zaman sıkıntım olduğu için tamamlayamadım */}
              <Playlist
                token={userData.token}
                id={playlist.id}
                uri={playlist.uri}
                name={playlist.name}
                description={playlist.description}
                imageSrc={playlist.images[0].url}
                url={playlist.external_urls.spotify}
                ownerData={playlist.owner}
                userId={userData.userId}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
}
