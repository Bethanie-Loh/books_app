import { Container, Row, Col, Button } from "react-bootstrap";

function Home() {
  return (
    <Container
      fluid
      className="text-center py-5"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Row className="justify-content-center">
        <Col xs={11} md={8} lg={6}>
          <div
            style={{
              padding: "30px",
              backgroundColor: "white",
              borderRadius: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{
                fontWeight: "bold",
                marginBottom: "20px",
                fontSize: "2rem",
              }}
            >
              📚 Welcome to Bookstore Adventures
            </h2>
            <p style={{ fontSize: "1.1rem", marginBottom: "30px" }}>
              This is the homepage. Use the navigation links above to explore!
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
