function CardsResults({ albums }) {
  return (
    <>
      {albums.length > 0 && <div className=" text-center">Recent Albums</div>}
      <div className=" flex justify-center p-2">
        <div className=" container grid grid-cols-2 md:grid-cols-4">
          {albums.length === 0 ? (
            <div className=" text-center col-span-4 font-bold">
              Search for something
            </div>
          ) : (
            albums.map((album, i) => {
              return (
                <a
                  className=" p-1"
                  href={`${album.external_urls.spotify}`}
                  target="_blank"
                  key={i}>
                  <div className="  mb-2 border-2">
                    <img
                      src={album.images[0].url}
                      alt=""
                    />
                    <div className=" flex justify-center">
                      <h2 className=" text-clip overflow-hidden ...">
                        {album.name}
                      </h2>
                    </div>
                  </div>
                </a>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default CardsResults;
