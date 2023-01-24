function TopTracks({ tracks }) {
  return (
    <>
      {tracks.length > 0 && <div className=" text-center">top tracks</div>}
      <div className=" flex justify-center p-2">
        <div className=" container flex flex-col">
          {tracks.length === 0
            ? ""
            : tracks.map((track, i) => {
                return (
                  <div
                    key={i}
                    className=" flex mb-1 border-2 ">
                    <img
                      src={track.album.images[2].url}
                      alt=""
                    />
                    <div className=" flex justify-center">
                      <h2 className=" text-clip overflow-hidden ...">
                        {track.name}
                      </h2>
                    </div>
                    {track.preview_url != null && (
                      <audio
                        className=" ml-auto max-w-[50%] "
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

export default TopTracks;
