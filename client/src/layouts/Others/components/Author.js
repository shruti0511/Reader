
import { Alert, Card, Collapse, IconButton, Stack, Tooltip } from '@mui/material';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import Table from 'examples/Tables/Table';
import React, { useEffect, useState } from 'react'
import authorService from 'services/authorService';
import SoftButton from 'components/SoftButton';
import AddUpdateAuthor from './AddUpdateAuthor'

import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SoftAvatar from 'components/SoftAvatar';
import defaultBookImage from "assets/images/default-images/defaultBookImage.jpg";

const Author = () => {
    // const { columns, rows } = data();
    const columns = [
        { name: "name", align: "left" },
        { name: "description", align: "left" },
        { name: "books", align: "left" },
        { name: "action", align: "center" },
    ]

    const [authors, setAuthors] = useState([]);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('add')
    const [author, setAuthor] = useState();

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleExcelUpload = () => {
        if (selectedFile) {
            console.log(selectedFile);
            const formData = new FormData();
            formData.append('file', selectedFile);
            authorService.importExcel(formData)
                .then((response) => {
                    if (response.status === 200) {
                        setAlert(true)
                        setSuccessMsg(response.data?.message)
                        setSelectedFile(null)
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

        } else {

            console.log("No file selected");
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [alert, setAlert] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        getAuthors()
    }, [successMsg, alert])


    const onsubmit = (message) => {
        setAlert(true)
        setSuccessMsg(message)
        handleClose()
    }

    const onUpdateClick = (data) => {
        setAuthor(data)
        setStatus('update')
        handleOpen()
    }
    const onAddClick = (data) => {
        setAuthor()
        setStatus('add')
        handleOpen()
    }
    const onDeleteClick = (id) => {
        authorService.deleteAuthor({ id: id })
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

    const avatars = (item) => {
        return (
            <Tooltip title={item.title} placeholder="bottom">
                 <SoftAvatar
                    src={item.image ? process.env.REACT_APP_SERVER_API + item.imagePath + "/" + item.image : defaultBookImage}
                    alt={item.title}
                    size="sm"
                    sx={{
                        border: ({ borders: { borderWidth }, palette: { white } }) =>
                            `${borderWidth[2]} solid ${white.main}`,
                        cursor: "pointer",
                        position: "relative",

                        "&:not(:first-of-type)": {
                            ml: -1.25,
                        },

                        "&:hover, &:focus": {
                            zIndex: "10",
                        },
                    }}
                />
            </Tooltip>
        )
    }
    const getAuthors = () => {
        authorService
            .getAuthorsWithBooks()
            .then((response) => {
                if (response.status === 200) {
                    const authors = response.data
                    const rowData = authors.map((item) => {
                        return (
                            {
                                name: (
                                    <SoftBox>
                                        <SoftTypography
                                            variant="body1"
                                            m={1}
                                            fontWeight="medium"
                                        >
                                            {item.name}
                                        </SoftTypography>
                                    </SoftBox>
                                ),
                                description: (

                                    <SoftBox sx={{ width: '400px' }}>
                                        <SoftTypography variant="caption" >
                                            {item.description}
                                        </SoftTypography>
                                    </SoftBox>
                                ),
                                books: (
                                    <SoftBox display="flex" py={1}>
                                        {item.books &&
                                            item.books.map((item, index)=>avatars(item))
                                        }
                                        {/* {item.books.length != 0 &&
                                        avatars(item.books)
                                        } */}
                                    </SoftBox>
                                ),
                                action: (
                                    <>
                                        <SoftBox display="flex" flexDirection="row" height="100%">
                                            {/* <SoftTypography mx={0.5} variant="h4">
                                                <InfoIcon color="secondary"
                                                    onClick={() => { navigate(`/bookDetail/${item._id}`) }}
                                                />
                                            </SoftTypography> */}
                                            <SoftTypography mx={0.5} variant="h4">
                                                <EditIcon color="info"
                                                    onClick={() => { onUpdateClick(item) }}
                                                /></SoftTypography>
                                            <SoftTypography mx={0.5} variant="h4">
                                                <DeleteIcon color="error"
                                                    onClick={() => { onDeleteClick(item._id) }}
                                                /></SoftTypography>
                                        </SoftBox>
                                    </>
                                )
                            }
                        )
                    })
                    setAuthors(rowData);
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

    return (
        <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h6">Authors</SoftTypography>
                <SoftBox spacing={3} display="flex" >
                    <SoftBox mx={2}>
                        <SoftButton
                            variant="gradient"
                            color="secondary"
                            onClick={onAddClick}
                        >
                            Add Author
                        </SoftButton>
                    </SoftBox>
                    <SoftBox mx={2}>
                        <SoftButton
                            variant="contained"
                            component="label"
                            endIcon={<FileUploadIcon />}
                            color="success"
                        >
                            Select Excel
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                            />
                        </SoftButton>
                    </SoftBox>
                    {selectedFile && <SoftBox>
                        <SoftButton
                            variant="contained"
                            component="label"
                            // endIcon={<FileUploadIcon />}
                            color="info"
                            onClick={handleExcelUpload}
                        >
                            Upload Excel
                        </SoftButton>
                    </SoftBox>}


                </SoftBox>
            </SoftBox>


            {
                open &&
                <AddUpdateAuthor status={status} author={author} onClose={onsubmit} handleClose={handleClose} />
            }
            {
                authors.length != 0
                    ? <SoftBox
                        sx={{
                            "& .MuiTableRow-root:not(:last-child)": {
                                "& td": {
                                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                        `${borderWidth[1]} solid ${borderColor}`,
                                },
                            },
                        }}
                    >
                        <SoftBox display="flex" justifyContent="center" alignItems="center">
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
                                    sx={{ width: 'auto' }}
                                >
                                    {successMsg ? successMsg : "Task Complete successfully!"}
                                </Alert>
                            </Collapse>
                        </SoftBox>
                        <Table columns={columns} rows={authors} />
                    </SoftBox>
                    : <Stack spacing={2} textAlign="center" mb={3}>
                        No Author Added
                    </Stack>
            }


        </Card>
    );
}

export default Author