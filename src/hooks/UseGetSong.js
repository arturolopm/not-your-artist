const useGetSong = async (id, searchParams) => {
  const tracksRelated = await fetch(
    "https://api.spotify.com/v1/artists/" +
      id +
      "/top-tracks" +
      "?include_groups=album&market=US",
    searchParams
  )
    .then((result) => result.json())
    .then((data) => {
      let rand = Math.floor(Math.random() * 10);
      return data.tracks[rand];
    });
  return tracksRelated;
};

export default useGetSong;
