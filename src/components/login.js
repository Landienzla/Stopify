import React from "react";
import { Container,  Row, Col } from "react-bootstrap";
export default function login() {
  return (
    <div>
      <Container className="loginContainer">
        <Container
          className="mt-5 p-3"
          style={{ color: "white", fontSize: "24px" }}
        >
          <Row>
            <Col className="welcomeText mt-3">Stopify'a Hoşgeldin</Col>
          </Row>
          <Row>
            <Col className="loginText mt-3">
              Devam Etmeden Önce Spotify İle Giriş Yapar Mısın?
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <button
                className="loginButton mt-5 ps-5 pe-5 "
                onClick={() => {
                  window.location.href =
                    "https://accounts.spotify.com/tr/authorize?client_id=0e3c50f09ea14530827e1e8fd30ec292&redirect_uri=http:%2F%2Flocalhost:3000&scope=playlist-modify-private playlist-read-private playlist-modify-public playlist-read-collaborative user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-library-modify user-library-read user-read-playback-position  user-read-recently-played user-top-read app-remote-control streaming user-follow-modify user-follow-read&response_type=token";
                }}
              >
                Giriş Yap
              </button>
            </Col>
          </Row>
        </Container>
      </Container>
      {/* Bu özelliği ekleyecek zamanım olmadığı için bu özellik daha sonra eklenicek */}
      {/* <Container className="infoContainer">
        <Container className="mt-5 p-3">
          <Row>
            <Col>
              Spotify çalma listende karışık çalma özelliği açık ama Spotify
              hala aynı şarkıları mı çalıyor?
            </Col>
          </Row>
          <Row>
            <Col>Stopify bu sorunu çözmek için üretildi</Col>
          </Row>
          <Row>
            <Col>
              Stopify kendi algoritması sayesinde sadece %20 ihtimalle daha önce
              çaldığı şarkıyı tekrar çalıyor
            </Col>
          </Row>
        </Container>
      </Container> */}
    </div>
  );
}
