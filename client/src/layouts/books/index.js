// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import SoftButton from "components/SoftButton";
import { Modal, Box, CardContent, Alert, Collapse, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import AddBook from "./component/AddBook";
import bookService from "services/bookService";
import Author from "./component/Author";
import Function from "./component/Function";
import SoftBadge from "components/SoftBadge";
import defaultBookImage from "assets/images/default-images/defaultBookImage.jpg";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import Ratings from "layouts/component/Ratings";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};
function Books() {
    const navigate = useNavigate()
    const columns = [
        { name: "title", align: "left" },
        { name: "author", align: "left" },
        { name: "category", align: "center" },
        { name: "rating", align: "center" },
        { name: "price", align: "center" },
        { name: "language", align: "center" },
        { name: "Released Date", align: "center" },
        { name: "action", align: "center" },
    ]
    const [open, setOpen] = useState(false);
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState();
    const [status, setStatus] = useState("add")
    const [alert, setAlert] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const closeModal = (message) => {
        console.log(message, 'msg');
        setAlert(true)
        setSuccessMsg(message)
        handleClose()
    }
    useEffect(() => {
        getBooks()
    }, [successMsg, alert])

    const openAddModal = () => {
        setBook({})
        setStatus("add")
        handleOpen()
    }
    const openUpdateModal = (book) => {
        setBook(book)
        setStatus("update")
        handleOpen()
    }

    const getBooks = () => {
        bookService
            .getAllBooks()
            .then((response) => {
                if (response.status === 200) {
                    const books = response.data
                    const rowData = books.map((item) => {
                        var imageSrc = item.image ? process.env.REACT_APP_SERVER_API + item.imagePath + "/" + item.image : defaultBookImage;
                        var publicationDate = new Date(item.publication_date)
                        return (
                            {
                                title: (<Author image={imageSrc} name={item.title} />),
                                author: (<Function job={item.author.name} />),
                                category: (
                                    <SoftBadge variant="gradient" badgeContent={item.category.name} color="success" size="xs" container />
                                ),
                                "Released Date": (
                                    <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                                        {publicationDate.toLocaleDateString()}
                                    </SoftTypography>
                                ),
                                rating: (
                                    <Ratings ratings={item.avgRating} showNumber={false} smallSize={true} />
                                ),
                                price: (
                                    <SoftTypography variant="caption">Rs. {item.price}</SoftTypography>
                                ),
                                language: (
                                    <SoftTypography variant="caption">{item.language.name}</SoftTypography>
                                ),
                                action: (
                                    <>
                                        <SoftBox display="flex" flexDirection="row" height="100%">
                                            <SoftTypography mx={0.5} variant="h4">
                                                <InfoIcon color="secondary"
                                                    onClick={() => { navigate(`/bookDetail/${item._id}`) }}
                                                />
                                            </SoftTypography>
                                            <SoftTypography mx={0.5} variant="h4">
                                                <EditIcon color="info"
                                                    onClick={() => { openUpdateModal(item) }}
                                                /></SoftTypography>
                                            <SoftTypography mx={0.5} variant="h4">
                                                <DeleteIcon color="error"
                                                    onClick={() => { deleteBookFun(item._id) }}
                                                /></SoftTypography>
                                        </SoftBox>
                                    </>
                                )
                            }
                        )
                    })
                    setBooks(rowData);
                }
            })
            .catch((error) => {
                // error is handled in catch block
                if (error.response) {
                    // status code out of the range of 2xx
                    console.log("Data :", error.response.data);
                    console.log("Status :" + error.response.status);
                    //}
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Error on setting up the request
                    console.log("Error", error.message);
                }
            });
    };

    const deleteBookFun = (id) => {
        bookService.deleteBook({ id: id })
            .then((response) => {
                if (response.status === 200) {
                    setAlert(true)
                    setSuccessMsg(response.data?.message)
                }
            })
            .catch((error) => {
                // error is handled in catch block
                if (error.response) {
                    // status code out of the range of 2xx
                    console.log("Data :", error.response.data);
                    console.log("Status :" + error.response.status);
                    //}
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Error on setting up the request
                    console.log("Error", error.message);
                }
            });
    }

    return (
        <DashboardLayout>
            <DashboardNavbar navTitle="Books"/>
            <SoftBox py={3}>
                <SoftBox mb={3}>
                    <Card>
                        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                            <SoftTypography variant="h6">Books</SoftTypography>
                            <SoftButton
                                variant="gradient"
                                color="secondary"
                                onClick={openAddModal}
                            >
                                Add Book
                            </SoftButton>


                        </SoftBox>
                        {books.length !== 0
                            ?
                            <SoftBox
                                sx={{
                                    "& .MuiTableRow-root:not(:last-child)": {
                                        "& td": {
                                            borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                                `${borderWidth[1]} solid ${borderColor}`,
                                        },
                                    },
                                }}
                            >

                                <SoftBox display="flex" justifyContent="center" alignItems="center" p={3}>
                                    <Collapse in={alert}>
                                        <Alert
                                            action={
                                                <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        setAlert(false);
                                                    }}
                                                >
                                                    <CloseIcon fontSize="inherit" />
                                                </IconButton>
                                            }
                                            sx={{ mb: 2, width: '1000px' }}
                                        >
                                            {successMsg ? successMsg : "Task Complete successfully!"}
                                        </Alert>
                                    </Collapse>
                                </SoftBox>


                                <Table columns={columns} rows={books} />



                            </SoftBox>
                            : <Stack spacing={2} textAlign="center" mb={3}>
                                No Book Available
                            </Stack>
                        }
                    </Card>
                </SoftBox>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                                Modal Header
                                <Button onClick={handleClose}>x</Button>
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Modal content

                            </Typography> */}
                        <Card variant="outlined">
                            <CardContent>
                                <AddBook status={status} closeModal={closeModal} book={book} />

                            </CardContent>
                        </Card>
                    </Box>
                </Modal>
            </SoftBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Books;
