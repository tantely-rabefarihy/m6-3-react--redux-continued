import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../helpers/api-helpers";

const ArtistRoute = () => {
  const accessToken = useSelector((state) => state.auth.token);
  const artistId = useParams();

  React.useEffect(() => {
    if (!accessToken) {
      return;
    }
    fetchArtistProfile(accessToken, artistId);
  }, [accessToken]);

  return <div>ARTIST</div>;
};

export default ArtistRoute;
