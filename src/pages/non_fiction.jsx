import { useEffect, useState } from "react";
import {
  Card,
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

function Non_Fiction() {
  const [nonFiction, setNonFiction] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setLoading(true);
    const url = `https://cu2-pa-b13-express-pip.onrender.com/non-fiction-books?search=${search}&limit=${limit}&page=${page}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setNonFiction(data);
        setHasNextPage(data.length === limit);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [search, limit, page]);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (hasNextPage) setPage(page + 1);
  };

  return (
    <Container
      fluid
      className="py-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <Row className="justify-content-center mb-4">
        <Col xs={11} md={10}>
          <h2 className="mb-4 text-center">📚 Non-Fiction Books</h2>

          <Row className="gy-3 mb-4">
            <Col xs={12} md={6}>
              <Form.Label className="fw-bold">
                Search by Title/Author:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book title or author..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Form.Label className="fw-bold">Books Per Page:</Form.Label>
              <Form.Select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
              >
                <option value={3}>3</option>
                <option value={6}>6</option>
                <option value={10}>10</option>
              </Form.Select>
            </Col>
          </Row>

          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading books...</p>
            </div>
          ) : nonFiction.length === 0 ? (
            <h5 className="text-center">No books found.</h5>
          ) : (
            <>
              <Row className="g-4 mb-4">
                {nonFiction.map((book, i) => (
                  <Col key={i} xs={12} sm={6} lg={4}>
                    <Card
                      className="shadow-sm h-100 custom-card"
                      style={{
                        cursor: "pointer",
                        transition:
                          "transform 0.3s ease, background-color 0.3s ease",
                        backgroundColor: "#ffffff",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#eaf3ff";
                        e.currentTarget.style.transform = "translateY(-5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#ffffff";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <Card.Body>
                        <Card.Title className="fw-bold">
                          {book.title}
                        </Card.Title>
                        <p>
                          <strong>Author:</strong> {book.author} <br />
                          <strong>Category:</strong> {book.category} <br />
                          <strong>Rating:</strong> ⭐ {book.rating}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              <div className="text-center">
                <Button
                  variant="secondary"
                  onClick={handlePrevious}
                  disabled={page === 1}
                  className="me-2"
                >
                  ⬅ Previous
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleNext}
                  disabled={!hasNextPage}
                >
                  Next ➡
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Non_Fiction;
