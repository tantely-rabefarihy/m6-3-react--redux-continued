import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../helpers/api-helpers";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  receiveArtistInfo,
  requestArtistInfo,
  receiveArtistInfoError,
} from "../actions";

export const ArtistRoute = () => {
  const accessToken = useSelector((state) => state.auth.token);
  const { id } = useParams();
  const dispatch = useDispatch();

  // ********

  React.useEffect(() => {
    dispatch(requestArtistInfo());
    if (!accessToken) {
      dispatch(receiveArtistInfoError());
      return;
    } else {
      fetchArtistProfile(accessToken, id).then((res) => {
        dispatch(receiveArtistInfo(res));
      });
    }
  }, [accessToken]);

  const currentArtist = useSelector((state) => state.artists.currentArtist);
  const artist = currentArtist ? currentArtist.profile.name : undefined;
  const genres = currentArtist
    ? currentArtist.profile.genres.slice(2)
    : undefined;
  const numFollowers = currentArtist
    ? new Intl.NumberFormat("en", { notation: "compact" }).format(
        currentArtist.profile.followers.total
      )
    : undefined;

  // Image URL
  let imageUrl;
  if (currentArtist && currentArtist.profile.images.length > 0) {
    imageUrl = currentArtist.profile.images[0].url;
  } else {
    imageUrl = undefined;
  }

  console.log({ currentArtist, genres });
  return (
    <Wrapper>
      {currentArtist ? (
        <>
          <NameContainer>
            <ArtistName>{artist}</ArtistName>
          </NameContainer>
          <AvatarContainer>
            <Avatar src={imageUrl} />
          </AvatarContainer>
          <Followers>
            <FollowersCount>{numFollowers}</FollowersCount> followers
          </Followers>
          <TopTracks>top tracks</TopTracks>
          <TagsContainer>
            <TagsP>tags</TagsP>
            <DisplayTagsContainers>
              <DisplayTag>{genres[0]}</DisplayTag>
              <DisplaySecondTag>{genres[2]}</DisplaySecondTag>
            </DisplayTagsContainers>
          </TagsContainer>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: black;
  max-height: 580px;
  height: 100vh;
  margin: auto;
  text-align: -webkit-center;
`;

const NameContainer = styled.div`
  position: relative;
  top: 170px;
  z-index: 1;
`;
const ArtistName = styled.h1`
  color: white;
  font-family: bold;
  font-family: Montserrat, sans-serif;
  font-size: 30px;
  padding: 0;
  margin: 0;
`;

const AvatarContainer = styled.div``;
const Avatar = styled.img`
  width: 175px;
  height: auto;
  border-radius: 50%;
  position: relative;
`;
const Followers = styled.p`
  color: white;
`;
const FollowersCount = styled.span`
  color: #ff4fd8;
`;

const TopTracks = styled.div`
  color: white;
  font-size: 1.5rem;
  margin-top: 100px;
`;

const TagsContainer = styled.div`
  margin: 10px 0;
  height: 100%;
`;
const DisplayTagsContainers = styled.div`
  display: flex;
  justify-content: space-between;
  width: fit-content;
`;
const TagsP = styled.p`
  color: white;
  font-size: 1.5rem;
`;

const DisplayTag = styled.div`
  background: rgba(75, 75, 75, 0.4);
  padding: 10px;
  border-radius: 5px;
  color: white;
`;

const DisplaySecondTag = styled(DisplayTag)`
  background: rgba(75, 75, 75, 0.4);
  padding: 10px;
  border-radius: 5px;
`;
