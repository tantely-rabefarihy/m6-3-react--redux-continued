// import { loadPartialConfig } from "@babel/core";

const initialState = {
  currentArtist: null,
  status: "loading",
  error: null,
};

export default function artistReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ARTIST_INFO": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_ARTIST_INFO": {
      return {
        ...state,
        status: "success",
        currentArtist: {
          profile: { ...action.data },
        },
      };
    }
    case "RECEIVE_ARTIST_INFO_ERROR": {
      return {
        ...state,
        currentArtist: null,
        error: action.error,
        status: "error",
      };
    }

    default: {
      return state;
    }
  }
}
