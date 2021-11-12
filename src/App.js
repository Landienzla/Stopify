import "./App.css";
import Login from "./components/login";
import Homepage from "./components/homepage";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./store/stopifySlice";
import { Container, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Loadpage from "./components/loadpage";
import User from "./components/user";
import Player from "./components/player";
import Playlists from "./components/playlists";
import PlaylistDetail from "./components/playlistDetail";
import Navbar from "./components/_navbar";
function App() {
  const dispatch = useDispatch();
  const userData = useSelector((data) => data.userData);
  let token = window.location.hash
    .substr(1)
    .split("access_token=")
    .pop()
    .split("&")[0];
  if (
    window.location.hash.substr(1).split("access_token=").pop().split("&")[0]
  ) {
    dispatch(login(token));
  }

  return (
    <Router basename="/">
      <div className="App">
        {userData.token === null && <Redirect to="/login" />}
        {window.location.hash.includes("#access_token") && (
          <Redirect to="/loading" />
        )}
        {userData.userId !== null && <Navbar />}
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/loading">
            <Loadpage />
          </Route>
          <Route exact path="/users/:id">
            <User />
          </Route>
          <Route exact path="/users/:id/playlists">
            <Playlists />
          </Route>
          <Route exact path="/users/:id/playlists/:playlistId">
            <PlaylistDetail />
          </Route>
        </Switch>
        {userData.token !== null && <Player />}
      </div>
    </Router>
  );
}
export default App;
