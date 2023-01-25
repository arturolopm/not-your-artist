import { useState, useEffect } from "react";
import useGetSong from "./hooks/UseGetSong";

function RelatedArtists({ artistID, searchParams, searchNumber }) {
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
  }, [artistID, searchNumber]);

  useEffect(() => {
    if (relatedArt) {
      setShowTracksToHear([]);
      const newIds = relatedArt.map((item) => item.id);
      const ids = newIds.slice(0, 14).reverse();
      const promises = ids.map(async (item) => {
        return useGetSong(item, searchParams);
      });
      Promise.all(promises).then((tracksToHear) => {
        const filtered = tracksToHear.filter(function (x) {
          return x !== undefined;
        });
        setShowTracksToHear(filtered);
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
                  <div className=" flex mb-1 border-2 ">
                    <a
                      className=" flex  "
                      href={`${track.external_urls.spotify}`}
                      target="_blank"
                      key={i}>
                      {track.album && (
                        <img
                          src={track.album.images[2].url}
                          alt=""
                        />
                      )}
                      <div className=" w-2/3 flex justify-start md:justify-center ">
                        <h2 className=" p-1 my-auto text-left ">
                          {track.name}
                        </h2>
                        <h2 className=" p-1 border-2 rounded-lg my-auto ">
                          {track.artists[0].name}
                        </h2>
                      </div>
                    </a>
                    {track.preview_url != null && (
                      <audio
                        className=" max-w-[30%] ml-auto p-1 "
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
