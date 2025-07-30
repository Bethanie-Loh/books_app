import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Spinner,
  Card,
} from "react-bootstrap";

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
    .filter((book) => selectedGenre === "All" || book.genre === selectedGenre)
    .sort((a, b) => {
      if (selectedSort === "title") {
        return a.title.localeCompare(b.title);
      } else if (selectedSort === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  return (
    <Container
      fluid
      className="py-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <Row className="justify-content-center mb-4">
        <Col xs={11} md={10} lg={8}>
          <Card className="shadow-sm p-4">
            <h2 className="mb-4 text-center">📖 Fiction Books</h2>

            {/* Filter and Sort Section */}
            <Row className="gy-3">
              <Col xs={12} md={6}>
                <Form.Label className="fw-bold">Filter By Genre:</Form.Label>
                <Form.Select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  {genreList.map((g, i) => (
                    <option key={i}>{g}</option>
                  ))}
                </Form.Select>
              </Col>

              <Col xs={12} md={6}>
                <Form.Label className="fw-bold">Sort By:</Form.Label>
                <Form.Select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="title">Title</option>
                  <option value="rating">Rating</option>
                </Form.Select>
              </Col>
            </Row>

            {/* Table Section */}
            {loading ? (
              <div className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading Fiction Books...</p>
              </div>
            ) : (
              <Table responsive bordered hover className="mt-4">
                <thead className="table-primary">
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
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Fiction;
