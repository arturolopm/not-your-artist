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
          Tracks that you should definetly hear if you liked this
          <p className=" text-xs">
            Click on the preview button to hear them or click on the images to
            listen on spotify
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
                    className=" group mb-1 border-2 flex justify-between bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-yellow-500">
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
                      <div className=" grow w-full px-0 flex-1 mx-auto  text-xs md:text-base  md:text-right flex flex-col md:flex-row justify-center items-center md:justify-between md:mx-auto md:w-80 lg:w-auto  ">
                        <div className=" w-40 lg:w-[498px]">
                          <h2
                            translate="no"
                            className=" underline underline-offset-2 p-1 my-auto pl-2 text-center md:text-left ">
                            {track.name}
                          </h2>
                        </div>
                        <div className="bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-yellow-500 border-2 rounded-lg text-center md:ml-auto ">
                          <h2
                            translate="no"
                            className=" p-1 my-auto ">
                            {track.artists[0].name}
                          </h2>
                        </div>
                      </div>
                    </a>
                    {track.preview_url != null ? (
                      <audio
                        className=" max-w-[35%]  p-1  text-xs "
                        controls>
                        <source
                          src={`${track.preview_url}`}
                          type="audio/mp3"
                        />
                        holis
                      </audio>
                    ) : (
                      <a
                        className=" ml-auto underline underline-offset-2  max-w-[35%] md:max-w-[300px] text-right text-xs mr-1 md:text-sm"
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
      {showTracksToHear.length > 0 && (
        <div className=" mx-auto text-center mb-2">
          {" "}
          If you search the same artist again you will have some different
          tracks
        </div>
      )}
    </div>
  );
}

export default RelatedArtists;
