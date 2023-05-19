const express = require("express");
const app = express();
const port = 3001;

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
app.get("/hello", (req, res) => {
  const name = req.query.name;
  const surname = req.query.surname;
  res.send(`Hello ${name} ${surname}`);
});

app.get("/albums", (req, res) => {
  const albumId = req.query.albumId;
  res.send(albums[albumId]);
});

app.get("/example", (req, res) => {
  res.send("this is an example function");
});

app.get("/RandomAlbum", (req, res) => {
  const randomId = Math.floor(Math.random() * albums.length);
  res.send(albums[randomId]);
});

app.get("/filterYear", (req, res) => {
  const year = parseInt(req.query.year);
  let filteredAlbums = [];

  const getBounds = (year) => {
    const lowerBound = Math.ceil(year / 10) * 10 - 10;
    const higherBound = Math.ceil(year / 10) * 10;
    return { lowerBound, higherBound };
  };

  const bounds = getBounds(year);

  const makeFilteredAlbumsArray = (bottomRange, topRange) => {
    filteredAlbums = albums.filter(
      (album) => album.year >= bottomRange && album.year < topRange
    );
  };

  makeFilteredAlbumsArray(bounds.lowerBound, bounds.higherBound);
  if (filteredAlbums.length === 0) {
    return res.send(`Sorry, we don't have any albums from ${year} :(`);
  }
  res.send(filteredAlbums);
});

app.get("/filterGenre", (req, res) => {
  const genre = req.query.genre;
  const filteredAlbums = [];
  const makeFilteredAlbumsArray = (albumGenre) => {
    filteredAlbums = albums.filter((album) => album.genre === albumGenre);
  };

  const returnAlbumsFromGenre = (albumGenre) => {
    if (genre === albumGenre) {
      makeFilteredAlbumsArray(albumGenre);
      res.send(filteredAlbums);
    }
  };

  returnAlbumsFromGenre("rock");
  returnAlbumsFromGenre("alternative");
  returnAlbumsFromGenre("pop");
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

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Random Album app listening on port ${port}`);
});
