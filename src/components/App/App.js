import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GlobalStyles from "../GlobalStyles";
import ArtistRoute from "../ArtistRoute";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";
import { useDispatch } from "react-redux";

const DEFAULT_ARTIST_ID = "3SKza3YPBri1k43LB1Tqy4";
const dispatch = useDispatch();

const App = () => {
  React.useEffect(() => {
    dispatch(requestAccessToken());

    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveAccessToken(json.access_token));
      })
      .catch((err) => {
        console.error(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);

  return (
    <Router>
      <GlobalStyles />
      <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
      <Switch>
        <Route path="/artists/:id" />
        <ArtistRoute />
        <Route />
      </Switch>
    </Router>
  );
};

export default App;
