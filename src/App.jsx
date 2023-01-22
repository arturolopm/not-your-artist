import React, { useState, useEffect } from "react";

import CardsResults from "./CardsResults";
import SearchForm from "./SearchForm";

const CLIENT_ID = "80e4b90e2c8c4e85bedb4ae39ec397bb";
const CLIENT_SECRET = "6fc1e429cac346b999f994891eb96fbd";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [albums, setAlbums] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }
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

  const search = async () => {
    console.log("Search for:  " + searchInput); // insert artist

    // get ArtistID

    const searchParams = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    const artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      searchParams
    )
      .then((result) => result.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    // get albums using artisID
    const albums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums" +
        "?include_groups=album&market=US&limit=50",
      searchParams
    )
      .then((result) => result.json())
      .then((data) => setAlbums(data.items));
  };
  console.log(albums);

  return (
    <>
      <SearchForm
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSubmit={handleSubmit}
      />
      <CardsResults albums={albums} />
    </>
  );
}

export default App;
