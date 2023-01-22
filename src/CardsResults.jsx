function CardsResults({ albums }) {
  return (
    <div className=" container grid grid-cols-4">
      {albums.map((album, i) => {
        return (
          <div>
            <div className=" border-2">
              <img
                src={album.images[0].url}
                alt=""
              />
              <div className=" flex flex-col items-center">
                <h2>{album.name}</h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CardsResults;
