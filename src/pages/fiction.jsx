import { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";

function Fiction() {
  const [fiction, setFiction] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedSort, setSelectedSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://cu2-pa-b13-express-pip.onrender.com/fiction-books")
      .then((res) => res.json())
      .then((json) => {
        setFiction(json);
        setLoading(false);
      });
  }, []);

  const genreList = ["All", ...new Set(fiction.map((book) => book.genre))];

  const filteredBooks = fiction
    .filter((book) => selectedGenre == "All" || book.genre == selectedGenre)
    .sort((a, b) => {
      if (selectedSort == "title") {
        return a.title.localeCompare(b.title);
      } else if (selectedSort == "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  return (
    <div>
      <h2 style={{ textAlign: "left", marginBottom: 30 }}>Fiction Books</h2>

      <div style={{ display: "flex", gap: 30 }}>
        <div
          style={{
            display: "flex",
            gap: 30,
            whiteSpace: "nowrap",
            alignItems: "center",
          }}
        >
          <Form.Label>Filter By Genre:</Form.Label>
          <Form.Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genreList.map((g, i) => (
              <option key={i}>{g}</option>
            ))}
          </Form.Select>
        </div>
        <div
          style={{
            display: "flex",
            gap: 30,
            whiteSpace: "nowrap",
            alignItems: "center",
          }}
        >
          <Form.Label>Sort By:</Form.Label>
          <Form.Select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            <option value="">None</option>
            <option value="title">Title</option>
            <option value="rating">Rating</option>
          </Form.Select>
        </div>
      </div>

      {loading ? (
        <h3>Loading Fiction Books...</h3>
      ) : (
        <Table bordered hover style={{ marginTop: 30 }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, i) => (
              <tr key={i}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.rating}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Fiction;
