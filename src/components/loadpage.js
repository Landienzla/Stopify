import React, { useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setDisplayName, setUserId } from "../store/stopifySlice";
import { Redirect } from "react-router";
export default function LoadPage() {
  const dispatch = useDispatch();
  const userData = useSelector((data) => data.userData);
  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
      .then((resp) => {
        dispatch(setUserId(resp.data.id));
        dispatch(setDisplayName(resp.data.display_name));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div style={{ top: "40%", position: "fixed", left: "45%" }}>
      {userData.userId !== null && (
        <Redirect to={`/users/${userData.userId}`} />
      )}
      <Spinner
        animation="border"
        style={{ width: "100px", height: "100px", color: "#46d678" }}
      />
    </div>
  );
}
