import { createSlice } from "@reduxjs/toolkit";
export const stopifySlice = createSlice({
  name: "userData",
  initialState: {
    token: null,
    userId: null,
    displayName: null,
    uri: "No Uri",
    playlistLen: 0,
    playlistQueue: [],
    currentSong: "null",
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = "No Token";
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    changeUri: (state, action) => {
      state.uri = action.payload;
    },
    addToQueue: (state, action) => {
      state.playlistQueue.push(action.payload);
    },
    cleanQueue: (state) => {
      state.playlistQueue = [];
    },
    setPlaylistLen: (state, action) => {
      state.playlistLen = action.payload;
    },
    setCurrentSong: (state, action) => {
      // if (
      //   state.playlistQueue.length > 0 &&
      //   state.playlistQueue[0].length === state.playlistLen
      // ) {
      //   state.currentSong = JSON.parse(
      //     JSON.stringify(
      //       state.playlistQueue[0][
      //         Math.floor(Math.random() * state.playlistQueue[0].length)
      //       ]
      //     )
      //   );
      // }
      state.currentSong = action.payload;
      if (!action.payload) {
        state.currentSong = JSON.parse(
          JSON.stringify(
            state.playlistQueue[0][
              Math.floor(Math.random() * state.playlistQueue[0].length)
            ]
          )
        );
      }
    },
  },
});
export const {
  login,
  logout,
  setUserId,
  setDisplayName,
  changeUri,
  addToQueue,
  cleanQueue,
  setPlaylistLen,
  setCurrentSong,
} = stopifySlice.actions;

export default stopifySlice.reducer;
