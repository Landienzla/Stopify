import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/stopifySlice";
import { useHistory } from "react-router";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
export default function _navbar() {
  const userData = useSelector((data) => data.userData);
  const dispatch = useDispatch();
  const history = useHistory();
  const routeProfile = () => {
    history.push(`/users/${userData.userId}`);
  };
  const routePlaylists = () => {
    history.push(`/users/${userData.userId}/playlists`);
  };
  return (
    <Navbar>
      <Container>
        <Navbar.Brand style={{ color: "white" }}>
          Hoşgeldin {userData.displayName}
        </Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link onClick={routeProfile} style={{ color: "white" }}>
            Profil
          </Nav.Link>
          <Nav.Link onClick={routePlaylists} style={{ color: "white" }}>
            Çalma Listelerin
          </Nav.Link>

          <Nav.Link>
            <Button
              variant="danger"
              onClick={() => {
                dispatch(logout());
                window.location.href = "http://localhost:3000";
              }}
            >
              Çıkış Yap
            </Button>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
