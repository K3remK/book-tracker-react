import { Book, useData } from "@/context/DataContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Input,
  Progress,
  Row,
} from "reactstrap";

export default function BookShelf(props: { id: string }) {
  const { id } = props;
  const { getBook, updateBook } = useData();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageAmount, setPageAmount] = useState("5");

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      const result = await getBook(id);
      setBook(result);
      setLoading(false);
    };
    fetchBook();
  }, []);

  if (loading) return <p>Loading book...</p>;
  if (!book) return <p>Book not found!</p>;

  const handlePageAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value != "" && !Number(value)) setPageAmount("5");
    else setPageAmount(value);
  };

  const handleIncrease = async () => {
    
    let newPageRead = book.pageRead + Number(pageAmount);
    if (newPageRead > book.pageTotal) {
      newPageRead = book.pageTotal;
    }

    let newStatus = book.status;
    if (newPageRead === book.pageTotal && book.status === "Reading")
      newStatus = "Finished";
	
    const updatedBook = { ...book, pageRead: newPageRead, status: newStatus };

    setBook(updatedBook);
    await updateBook(updatedBook);
  };

  const handleDecrease = async () => {
    let newPageRead = book.pageRead - Number(pageAmount);
    if (newPageRead < 0) {
      newPageRead = 0;
    }
  

    let newStatus = book.status;
    if (newPageRead < book.pageTotal && book.status === "Finished")
      newStatus = "Reading";

    const updatedBook = { ...book, pageRead: newPageRead, status: newStatus };

    setBook(updatedBook);
    await updateBook(updatedBook);
  };

  return (
    <Card style={{ maxHeight: 400 }}>
      <Row className="">
        <Col md={4}>
          {book.image ? (
            <CardImg
              alt="Book Image"
              src={book.image}
              className="w-100 h-100"
              style={{ objectFit: "contain", maxHeight: "200px" }}
            />
          ) : ( 
            ""
          )}
        </Col>
        <Col md={8}>
          <CardBody>
            <CardTitle className="fw-bold">{book.name}</CardTitle>

            <CardSubtitle
              className="
                            text-muted
                            small"
            >
              {book.writer} | {book.publisher}
            </CardSubtitle>

            <div className="gap-2 align-items-center d-flex">
              <CardText className="mb-0">Status: {book.status}</CardText>

              {book.status === "Finished" && (
                <Image
                  src={"/check-mark.png"}
                  alt="done"
                  width={16}
                  height={16}
                />
              )}
            </div>

            <ButtonGroup className="me-2">
              <Button color="info" onClick={handleDecrease}>
                -
              </Button>
              <Input
                className="text-center"
                type="text"
                id="pageControl"
                value={pageAmount}
                onChange={handlePageAmountChange}
              ></Input>
              <Button color="info" onClick={handleIncrease}>
                +
              </Button>
            </ButtonGroup>

            <CardText>
              {book.pageRead}/{book.pageTotal}
            </CardText>

            <Progress
              animated
              color="info"
              value={(book.pageRead / book.pageTotal) * 100}
            />
          </CardBody>
        </Col>
      </Row>
    </Card>
  );
}
