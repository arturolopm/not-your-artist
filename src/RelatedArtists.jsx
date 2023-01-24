import { useState, useEffect } from "react";
import useGetSong from "./hooks/UseGetSong";

function RelatedArtists({ artistID, searchParams, accessToken }) {
  // const useGetSong = async (id) => {
  //   const tracksRelated = await fetch(
  //     "https://api.spotify.com/v1/artists/" +
  //       id +
  //       "/top-tracks" +
  //       "?include_groups=album&market=US",
  //     searchParams
  //   )
  //     .then((result) => result.json())
  //     .then((data) => {
  //       let rand = Math.floor(Math.random() * 10);
  //       return data.tracks[rand];
  //     });
  //   return tracksRelated;
  // };
  const [showTracksToHear, setShowTracksToHear] = useState([]);
  console.log(showTracksToHear);
  const [relatedArt, setRelatedArt] = useState([]);
  useEffect(() => {
    const Related = async () =>
      await fetch(
        "https://api.spotify.com/v1/artists/" +
          artistID +
          "/related-artists" +
          "?include_groups=album&market=US",
        searchParams
      )
        .then((result) => result.json())
        .then((data) => setRelatedArt(data.artists));

    Related();
  }, [artistID]);

  useEffect(() => {
    if (relatedArt) {
      setShowTracksToHear([]);
      const newIds = relatedArt.map((item) => item.id);
      const ids = newIds.slice(0, 14).reverse();
      const promises = ids.map(async (item) => {
        return useGetSong(item, searchParams);
      });
      Promise.all(promises).then((tracksToHear) => {
        setShowTracksToHear(tracksToHear);
      });
    }
  }, [relatedArt]);

  return (
    <>
      {showTracksToHear.length > 0 && (
        <div className=" text-center">top tracksToHear</div>
      )}
      <div className=" flex justify-center p-2">
        <div className=" container flex flex-col">
          {showTracksToHear.length === 0
            ? ""
            : showTracksToHear.map((track, i) => {
                return (
                  <div
                    key={i}
                    className=" flex mb-1 border-2 ">
                    {track.album && (
                      <img
                        src={track.album.images[2].url}
                        alt=""
                      />
                    )}
                    <div className=" flex justify-center">
                      <h2 className=" p-1 ">{track.name}</h2>
                      <h2 className=" p-1 ">{track.artists[0].name}</h2>
                    </div>
                    {track.preview_url != null && (
                      <audio
                        className=" ml-auto "
                        controls>
                        <source
                          src={`${track.preview_url}`}
                          type="audio/mp3"
                        />
                      </audio>
                    )}
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
}

export default RelatedArtists;
