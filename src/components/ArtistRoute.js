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

  const state = useSelector((state) => state);

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
    ? currentArtist.profile.genres.slice(0, 2)
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

  console.log({ currentArtist });
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
            <FollowersCount>{numFollowers}</FollowersCount> Followers
          </Followers>
          <TopTracks>top tracks</TopTracks>
          <TagsContainer>
            <TagsP>tags</TagsP>
            <DisplayTagsContainers>
              <DisplayTag>{genres[0]}</DisplayTag>
              <DisplaySecondTag>{genres[1]}</DisplaySecondTag>
            </DisplayTagsContainers>
          </TagsContainer>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const NameContainer = styled.div``;
const ArtistName = styled.h1``;

const AvatarContainer = styled.div``;
const Avatar = styled.img``;
const Followers = styled.p``;
const FollowersCount = styled.span``;

const TopTracks = styled.div`
  font-size: 1.5rem;
  margin-top: 100px;
`;

const TagsContainer = styled.div`
  margin-top: 40px;
  margin-top: 130px;
`;
const DisplayTagsContainers = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TagsP = styled.p`
  font-size: 1.5rem;
`;

const DisplayTag = styled.div`
  background: rgba(75, 75, 75, 0.4);
  padding: 10px;
  border-radius: 5px;
`;

const DisplaySecondTag = styled(DisplayTag)`
  margin-left: 5px;
`;
