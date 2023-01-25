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
    if (artistID) {
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
    }
  }, [artistID]);
  console.log(base);
  return (
    <>
      {base ? (
        <>
          <div className=" text-center font-bold">Base Artist</div>
          <div className=" flex justify-center p-2">
            <div className=" mb-2 mx-auto border-2">
              {typeof base.images[2].url != "undefined" && (
                <img
                  src={base.images[2].url}
                  alt=""
                />
              )}

              <div className=" flex justify-center">
                <h2 className=" text-clip overflow-hidden ...">{base.name}</h2>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className=" font-bold text-center">
          This will not be your artist
        </div>
      )}
    </>
  );
}

export default BaseArtist;
