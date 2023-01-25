# not-your-artist

If you liken an artist you can seacrh here for songs that sound like that artist, but is not your artist

This is a simple app that allows users to search for an artist on Spotify and see their top tracks, related artists, and albums.

## Getting started

To get the app up and running on your local machine, you'll need to do the following:

1. Clone the repository
   git clone https://github.com/arturolopm/not-your-artist.git

2. Install dependencies

npm install

3. Start the development server

## Features

- Search for an artist on Spotify
- See the artist's top tracks
- See related artists
- See the artist's albums

## Technologies used

- React
- Spotify Web API

## Known issues

- None

## Future improvements

- Add pagination to albums and tracks display
- Allow users to listen to the tracks
- Add a loading animation while the app fetches data from the Spotify API

## Code

You can find the code for the app in the `src` directory. The entry point for the app is `src/App.js`.

The app uses the Spotify Web API to fetch data. You'll need to provide your own `CLIENT_ID` and `CLIENT_SECRET` in `src/App.js` to be able to use the API.

You can get your owns at:
https://developer.spotify.com/dashboard/applications

The app uses functional components and hooks (useState and useEffect) for managing state and side effects.

## Contribute

If you want to contribute to this project, please create a fork and make a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
