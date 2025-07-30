import { Nav, Navbar, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function AppBar() {
  const location = useLocation();

  // Function to add active styling
  const getLinkStyle = (path) => ({
    fontWeight: "bold",
    fontSize: 18,
    color: location.pathname === path ? "#fff" : "#f8f9fa",
    backgroundColor: location.pathname === path ? "#0d6efd" : "transparent",
    padding: "8px 15px",
    borderRadius: "6px",
    textDecoration: "none",
    transition: "0.3s",
  });

  return (
    <Navbar
      expand="md"
      style={{ backgroundColor: "lightblue" }}
      className="shadow-sm mb-4"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ fontWeight: "bold", fontSize: 20 }}
        >
          📚 Bookstore Adventures
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav style={{ gap: 15 }}>
            <Nav.Link as={Link} to="/" style={getLinkStyle("/")}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/fiction" style={getLinkStyle("/fiction")}>
              Fiction Books
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/non-fiction"
              style={getLinkStyle("/non-fiction")}
            >
              Non-Fiction Books
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppBar;
