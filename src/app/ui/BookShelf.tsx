import { Book } from "@/context/DataContext";
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "reactstrap";

export default function BookShelf(props: { book : Book }) {
    const { book } = props;

    return (
        <Card style={{ maxHeight: 400 }}>
            <Row className="">
                <Col md={4}>
                    {book.image ? <CardImg 
                        alt="Book Image" 
                        src={book.image} 
                        className="w-100 h-100"
                        style={{ objectFit: "contain", maxHeight: "200px" }}
                        /> : ""}
                </Col>
                <Col md={8}>
                    <CardBody>
                        <CardTitle className="fw-bold">{book.name}</CardTitle>

                        <CardText tag="h5">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                        <CardText>Last updated 3 mins ago</CardText>
                    </CardBody>
                </Col>
            </Row>
        </Card>
    )
}