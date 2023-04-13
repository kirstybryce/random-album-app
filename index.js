const express = require("express");
const app = express();
const port = 3000;

const albums = [
  {
    name: "The Record",
    artist: "Boygenius",
    year: 2023,
    genre: "alternative",
    mood: ["melancholic", "sad", "romantic"],
    cover:
      "https://www.mondosonoro.com/wp-content/uploads/2023/04/boygenius-the-record.jpg",
  },
  {
    name: "This is Why",
    artist: "Paramore",
    year: 2023,
    genre: "rock",
    mood: ["angst", "powerful", "romantic"],
    cover:
      "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/91T8oKMkowL._SL1500_.jpg",
  },
  {
    name: "Preacher's Daughter",
    artist: "Ethel Cain",
    year: 2022,
    genre: "alternative",
    mood: ["sad", "melancholic", "dark"],
    cover:
      "https://media.pitchfork.com/photos/627c0ad088edeb4d342d9258/1:1/w_600/Ethel-Cain-Preachers-Daughter-2022.jpg",
  },
  {
    name: "Midnights",
    artist: "Taylor Swift",
    year: 2022,
    genre: "pop",
    mood: ["romantic", "melancholic", "energetic"],
    cover: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5",
  },
  {
    name: "Rhythm of Love",
    artist: "Kylie Minogue",
    year: 1990,
    genre: "pop",
    mood: ["happy", "romantic", "energetic"],
    cover: "",
  },
];

// req = request, res = response
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/hello", (req, res) => {
  const name = req.query.name;
  const surname = req.query.surname;
  res.send(`Hello ${name} ${surname}`);
});

app.get("/albums", (req, res) => {
  const albumId = req.query.albumId;
  res.send(albums[albumId]);
});

app.get("/RandomAlbum", (req, res) => {
  const randomId = Math.floor(Math.random() * albums.length);
  res.send(albums[randomId]);
});

app.get("/filterYear", (req, res) => {
  const year = parseInt(req.query.year);
  const filteredAlbums = [];
  const makeFilteredAlbumsArray = (bottomRange, topRange) => {
    albums.map((album) =>
      album.year >= bottomRange && album.year < topRange
        ? filteredAlbums.push(album)
        : null
    );
  };

  if (year >= 1950 && year < 1960) {
    makeFilteredAlbumsArray(1950, 1960);
    res.send(filteredAlbums);
  } else if (year >= 1960 && year < 1970) {
    makeFilteredAlbumsArray(1960, 1970);
    res.send(filteredAlbums);
  } else if (year >= 1970 && year < 1980) {
    makeFilteredAlbumsArray(1970, 1980);
    res.send(filteredAlbums);
  } else if (year >= 1980 && year < 1990) {
    makeFilteredAlbumsArray(1980, 1990);
    res.send(filteredAlbums);
  } else if (year >= 1990 && year < 2000) {
    makeFilteredAlbumsArray(1990, 2000);
    res.send(filteredAlbums);
  } else if (year >= 2000 && year < 2010) {
    makeFilteredAlbumsArray(2000, 2010);
    res.send(filteredAlbums);
  } else if (year >= 2020 && year < 2030) {
    makeFilteredAlbumsArray(2020, 2030);
    res.send(filteredAlbums);
  } else {
    res.send(`Sorry, we don't have any albums from ${year} :(`);
  }
});

app.get("/filterGenre", (req, res) => {
  const genre = req.query.genre;
  const filteredAlbums = [];
  const makeFilteredAlbumsArray = (albumGenre) => {
    albums.map((album) =>
      album.genre === albumGenre ? filteredAlbums.push(album) : null
    );
  };

  if (genre === "rock") {
    makeFilteredAlbumsArray(genre);
    res.send(filteredAlbums);
  } else if (genre === "alternative") {
    makeFilteredAlbumsArray(genre);
    res.send(filteredAlbums);
  } else if (genre === "pop") {
    makeFilteredAlbumsArray(genre);
    res.send(filteredAlbums);
  } else {
    res.send(`Sorry, we don't have any ${genre} albums :(`);
  }
});

app.get("/filterMood", (req, res) => {
  const mood = req.query.mood;
  const filteredAlbums = [];
  const makeFilteredAlbumsArray = (albumMood) => {
    albums.map((album) =>
      album.mood.map((mood) =>
        mood === albumMood ? filteredAlbums.push(album) : null
      )
    );
  };

  if (mood === "happy") {
    makeFilteredAlbumsArray(mood);
    res.send(filteredAlbums);
  } else if (mood === "sad") {
    makeFilteredAlbumsArray(mood);
    res.send(filteredAlbums);
  } else if (mood === "energetic") {
    makeFilteredAlbumsArray(mood);
    res.send(filteredAlbums);
  } else if (mood === "romantic") {
    makeFilteredAlbumsArray(mood);
    res.send(filteredAlbums);
  } else {
    res.send(`Sorry, we don't have any ${mood} albums :(`);
  }
});

app.listen(port, () => {
  console.log(`Random Album app listening on port ${port}`);
});
