import React, { useState, useEffect } from "react";
import BaseArtist from "./BaseArtist";

import CardsResults from "./CardsResults";
import RelatedArtists from "./RelatedArtists";
import SearchForm from "./SearchForm";
import TopTracks from "./TopTracks";

const CLIENT_ID = "80e4b90e2c8c4e85bedb4ae39ec397bb";
const CLIENT_SECRET = "6fc1e429cac346b999f994891eb96fbd";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [searchParams, setSearchParams] = useState({});
  const [searchInput, setSearchInput] = useState();
  const [artistID, setArtistID] = useState();
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);

  const [searchNumber, setSearchNumber] = useState(0);
  console.log(searchNumber, "Attempt");
  function handleSubmit(event) {
    event.target[0].blur();
    event.preventDefault();

    setSearchNumber(searchNumber + 1);
  }
  useEffect(() => {
    const search = async () => {
      // get ArtistID
      setTracks([]);
      setSearchParams({
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });

      const getArtistID =
        searchInput &&
        (await fetch(
          "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
          searchParams
        ).then((result) => {
          if (result.status === 200) {
            // will succeed unless server logic or your logic is off
            return result.json().then((data) => {
              setArtistID(data.artists.items[0].id);

              setSearchNumber(0);
            });
          } else if (result.status === (400 || 401)) {
            // will succeed if the server will always respond with JSON with a 400 result
            return setSearchNumber(searchNumber + 1);
          }
          // else {
          //     // there was some other error in the result, such as status 500
          //     setErrors(result.statusText);
          // }
        }));
    };
    search();
  }, [searchNumber]);

  useEffect(() => {
    //Access token
    const authParams = {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  //Searhing

  useEffect(() => {
    // get albums using artisID
    const albums = async () =>
      artistID &&
      (await fetch(
        "https://api.spotify.com/v1/artists/" +
          artistID +
          "/albums" +
          "?include_groups=album&market=US&limit=50",
        searchParams
      )
        .then((result) => result.json())
        .then((data) => setAlbums(data.items)));
    // get top tracks using artisID

    const tracks = async () =>
      artistID &&
      (await fetch(
        "https://api.spotify.com/v1/artists/" +
          artistID +
          "/top-tracks" +
          "?include_groups=album&market=US",
        searchParams
      )
        .then((result) => result.json())
        .then((data) => setTracks(data.tracks)));
    albums();
    tracks();
  }, [artistID]);

  return (
    <div className=" container min-h-screen min-w-full max-w-full overflow-x-hidden backdrop-blur-xl bg-black/10  text-white">
      <SearchForm
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSubmit={handleSubmit}
      />
      <BaseArtist
        artistID={artistID}
        searchParams={searchParams}
        accessToken={accessToken}
      />
      <RelatedArtists
        artistID={artistID}
        searchParams={searchParams}
        accessToken={accessToken}
        searchNumber={searchNumber}
      />
      <CardsResults albums={albums} />
      <TopTracks tracks={tracks} />
    </div>
  );
}

export default App;
