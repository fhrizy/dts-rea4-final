const requests = [
  { rowID: "0", title: "Up Coming", fetchURL: "movie/upcoming?language=en-US" },
  { rowID: "1", title: "Popular", fetchURL: 'movie/popular?language=en-US' },
  { rowID: "2", title: "Trending", fetchURL: 'movie/popular?language=en-US&page=2' },
  { rowID: "3", title: "Top Rated", fetchURL: 'movie/top_rated?language=en-US' },
  { rowID: "4", title: "Horror", fetchURL: 'search/movie?language=en-US&query=horror&page=1&include_adult=false' }
];
export default requests;
