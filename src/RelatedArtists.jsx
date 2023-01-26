import { useState, useEffect } from "react";
import useGetSong from "./hooks/UseGetSong";

function RelatedArtists({ artistID, searchParams, searchNumber }) {
  const [showTracksToHear, setShowTracksToHear] = useState([]);

  const [relatedArt, setRelatedArt] = useState([]);
  useEffect(() => {
    const Related = async () =>
      typeof artistID != "undefined" &&
      (await fetch(
        "https://api.spotify.com/v1/artists/" +
          artistID +
          "/related-artists" +
          "?include_groups=album&market=US",
        searchParams
      )
        .then((result) => result.json())
        .then((data) => setRelatedArt(data.artists)));

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
    <div className=" container mx-auto">
      {showTracksToHear.length > 0 && (
        <div className=" mx-2 text-center">
          {" "}
          tracks that you should definetly hear if you liked this
          <p className=" text-xs">
            Click on the preview button to to hear them or click on the images
            to listen on spotify
          </p>
        </div>
      )}
      <div className=" mx-auto  flex justify-center p-2">
        <div className=" container flex flex-col">
          {showTracksToHear.length === 0
            ? ""
            : showTracksToHear.map((track, i) => {
                return (
                  <div
                    key={i}
                    className=" flex mb-1 border-2 justify-between ">
                    <a
                      className=" flex items-center "
                      href={`${track.external_urls.spotify}`}
                      target="_blank">
                      {track.album && (
                        <img
                          src={track.album.images[2].url}
                          alt=""
                        />
                      )}
                      <div className=" text-xs md:text-base max-w-[60%] md:text-right flex justify-start  ">
                        <h2
                          translate="no"
                          className=" underline underline-offset-2  p-1 my-auto text-left ">
                          {track.name}
                        </h2>
                        <h2
                          translate="no"
                          className="   p-1 border-2 rounded-lg my-auto ">
                          {track.artists[0].name}
                        </h2>
                      </div>
                    </a>
                    {track.preview_url != null ? (
                      <audio
                        className=" max-w-[35%] ml-auto p-1 text-xs "
                        controls>
                        <source
                          src={`${track.preview_url}`}
                          type="audio/mp3"
                        />
                      </audio>
                    ) : (
                      <a
                        className=" underline underline-offset-2  max-w-[35%] text-right text-xs mr-1 md:text-sm"
                        href={`${track.external_urls.spotify}`}
                        target="_blank">
                        {" "}
                        Preview not available, click here to listen on spotify
                      </a>
                    )}
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default RelatedArtists;
