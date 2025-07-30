import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function AppBar() {
  return (
    <Navbar
      style={{
        backgroundColor: "lightblue",
        justifyContent: "center",
        marginBottom: 50,
      }}
    >
      <Nav style={{ gap: 30 }}>
        <Nav.Link as={Link} to="/" style={{ fontWeight: "bold", fontSize: 18 }}>
          Home
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/fiction"
          style={{ fontWeight: "bold", fontSize: 18 }}
        >
          Fiction Books
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/non-fiction"
          style={{ fontWeight: "bold", fontSize: 18 }}
        >
          Non-Fiction Books
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default AppBar;

