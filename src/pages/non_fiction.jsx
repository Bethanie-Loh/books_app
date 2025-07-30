import { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

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
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "left", marginBottom: 30 }}>Non-Fiction Books</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            whiteSpace: "nowrap",
          }}
        >
          <Form.Label>Search by Title/Author:</Form.Label>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            whiteSpace: "nowrap",
          }}
        >
          <Form.Label>Books Per Page:</Form.Label>
          <Form.Select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>10</option>
          </Form.Select>
        </div>
      </div>

      {loading ? (
        <h4>Loading books...</h4>
      ) : nonFiction.length === 0 ? (
        <h5>No books found.</h5>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
              marginBottom: 20,
            }}
          >
            {nonFiction.map((book, i) => (
              <Card key={i} body style={{ textAlign: "left" }}>
                <Card.Title
                  style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}
                >
                  {book.title}
                </Card.Title>
                <p style={{ justifyContent: "left" }}>
                  <strong>Author:</strong> {book.author} <br />
                  <strong>Category:</strong> {book.category} <br />
                  <strong>Rating:</strong> {book.rating}
                </p>
              </Card>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              onClick={handleNext}
              disabled={!hasNextPage}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Non_Fiction;
