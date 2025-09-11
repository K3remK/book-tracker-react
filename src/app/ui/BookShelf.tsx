import { Book, useData } from "@/context/DataContext";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, CardBody, CardImg, CardText, CardTitle, Col, Input, Progress, Row } from "reactstrap";

export default function BookShelf(props: { id : string }) {
    const { id } = props;
    const { getBook, updateBook } = useData();

    const [ book, setBook ] = useState<Book | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ pageAmount, setPageAmount ] = useState("5");
    
    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            const result = await getBook(id);
            setBook(result);
            setLoading(false);
        }
        fetchBook();
    }, []);

    if (loading) return <p>Loading book...</p>
    if (!book) return <p>Book not found!</p>

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

        const updatedBook = { ...book, pageRead: newPageRead };

        setBook(updatedBook);
        await updateBook(updatedBook);
    }

    const handleDecrease = async () => {
        let newPageRead = book.pageRead - Number(pageAmount);
        if (newPageRead < 0) {
            newPageRead = 0;
        }

        const updatedBook = { ...book, pageRead: newPageRead };

        setBook(updatedBook);
        await updateBook(updatedBook);
    }


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
                        <ButtonGroup className="me-2">
                            <Button color="info" onClick={handleDecrease}>-</Button>
                            <Input className="text-center" type="text" id="pageControl" value={pageAmount} onChange={handlePageAmountChange}></Input>
                            <Button color="info" onClick={handleIncrease}>+</Button>
                        </ButtonGroup>
                        <CardText>{book.pageRead}/{book.pageTotal}</CardText>
                        <Progress 
                            animated 
                            color="info"
                            value={book.pageRead / book.pageTotal * 100}
                        />
                    </CardBody>
                </Col>
            </Row>
        </Card>
    )
}