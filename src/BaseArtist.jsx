import { useState, useEffect } from "react";

function BaseArtist({ artistID, accessToken }) {
  const searchParams = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };
  const [base, setBase] = useState();

  useEffect(() => {
    const base = async () =>
      accessToken &&
      (await fetch(
        "https://api.spotify.com/v1/artists/" +
          artistID +
          "?include_groups=album&market=US",
        searchParams
      )
        .then((result) => result.json())
        .then((data) => setBase(data)));
    base();
  }, [artistID]);

  return (
    <>
      {base ? (
        <>
          <div className=" text-center">Base Artist</div>
          <div className=" flex justify-center p-2">
            <div className=" mb-2 mx-auto border-2">
              <img
                src={base.images[2].url}
                alt=""
              />

              <div className=" flex justify-center">
                <h2 className=" text-clip overflow-hidden ...">{base.name}</h2>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2>This will not be your artist</h2>
      )}
    </>
  );
}

export default BaseArtist;
