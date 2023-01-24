function CardsResults({ albums }) {
  return (
    <>
      {albums.length > 0 && <div className=" text-center">Albums</div>}
      <div className=" flex justify-center p-2">
        <div className=" container grid grid-cols-2 md:grid-cols-4">
          {albums.length === 0 ? (
            <h2>Search for something</h2>
          ) : (
            albums.map((album, i) => {
              return (
                <div
                  key={i}
                  className=" mb-2 border-2">
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
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default CardsResults;
