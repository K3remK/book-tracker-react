import { useData } from "@/context/DataContext";
import { Col, Container, Row } from "reactstrap";
import BookShelf from "./BookShelf";

export default function Library() {
  const { books } = useData();

  return (
    <Container fluid className="p-3">
      <Row className="p-1">
        {books.map((item, index) => {
          return (
            <Col key={`book-${index}`} sm="12" md="6" lg="4" className="p-1">
              <BookShelf id={item.id} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
