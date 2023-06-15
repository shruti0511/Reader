import { Alert, Button, Card, Collapse, IconButton, Stack } from '@mui/material';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import Table from 'examples/Tables/Table';
import React, { useEffect, useState } from 'react'
import SoftButton from 'components/SoftButton';
import languageService from 'services/languageService';
import AddUpdateLanguage from './AddUpdateLanguage';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Language = () => {
    // const { columns, rows } = data();
    const columns = [
        { name: "name", align: "left" },
        { name: "country", align: "left" },
        { name: "action", align: "center" },
    ]

    const [languages, setLanguages] = useState([]);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('add')
    const [language, setLanguage] = useState();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleExcelUpload = () => {
        if (selectedFile) {
            console.log(selectedFile);
            const formData = new FormData();
            formData.append('file', selectedFile);
            languageService.importExcel(formData)
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
        getLanguages()
    }, [successMsg, alert])


    const onsubmit = (message) => {
        setAlert(true)
        setSuccessMsg(message)
        handleClose()
    }

    const onUpdateClick = (data) => {
        setLanguage(data)
        setStatus('update')
        handleOpen()
    }
    const onAddClick = (data) => {
        setLanguage()
        setStatus('add')
        handleOpen()
    }
    const onDeleteClick = (id) => {
        languageService.deleteLanguage({ id: id })
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

    const getLanguages = () => {
        languageService
            .getLanguages()
            .then((response) => {
                if (response.status === 200) {
                    const languages = response.data
                    const rowData = languages.map((item) => {
                        // var imageSrc = item.image ? process.env.REACT_APP_SERVER_API + item.imagePath + "/" + item.image : defaultCategory;
                        // var publicationDate = new Date(item.publication_date)
                        return (
                            {
                                name: (
                                    // <Author image={imageSrc} name={item.title} />
                                    <SoftTypography
                                        variant="body2"
                                        mx={2}
                                        fontWeight="medium"
                                    >
                                        {item.name}
                                    </SoftTypography>
                                ),
                                country: (
                                    <SoftTypography
                                        variant="body2"
                                        mx={2}
                                        fontWeight="medium"
                                    >
                                        {item.country}
                                    </SoftTypography>
                                ),
                                action: (
                                    <>
                                        <SoftBox display="flex" flexDirection="row" height="100%">
                                            {/* <SoftTypography mx={0.5} variant="h4">
                                                <InfoIcon color="secondary"
                                                    onClick={() => { navigate(`/bookDetail/${item._id}`) }}
                                                />
                                            </SoftTypography> */}
                                            <SoftTypography mx={0.5} variant="h6">
                                                <EditIcon color="info"
                                                    onClick={() => { onUpdateClick(item) }}
                                                /></SoftTypography>
                                            <SoftTypography mx={0.5} variant="h6">
                                                <DeleteIcon color="error"
                                                    onClick={() => { onDeleteClick(item._id) }}
                                                /></SoftTypography>
                                        </SoftBox>
                                    </>
                                )
                            }
                        )
                    })
                    setLanguages(rowData);
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
                <SoftTypography variant="h6">Languages</SoftTypography>
                <SoftBox spacing={3} display="flex" >
                    <SoftBox mx={2}>
                        <SoftButton
                            variant="gradient"
                            color="secondary"
                            onClick={onAddClick}
                        >
                            Add Language
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
                <AddUpdateLanguage status={status} language={language} onClose={onsubmit} handleClose={handleClose} />
            }
            {
                languages.length != 0
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
                        <Table columns={columns} rows={languages} />
                    </SoftBox>
                    : <Stack spacing={2} textAlign="center" mb={3}>
                        No Languages Added
                    </Stack>
            }
        </Card>
    );
}

export default Language