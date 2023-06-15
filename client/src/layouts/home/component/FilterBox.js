import React from 'react'
import PropTypes from 'prop-types'
import SoftBox from 'components/SoftBox'
import useAuthors from 'hooks/useAuthors'
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import { useState } from 'react'
import { useTheme } from '@emotion/react'
import useCategories from 'hooks/useCategory'
import useLanguages from 'hooks/useLanguage'
import SoftButton from 'components/SoftButton'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 180,
        },
    },
};
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const FilterBox = ({ filterBooks, resetBooks }) => {
    const {
        status: authorStatus,
        data: authorData
    } = useAuthors()

    const {
        status: categoryStatus,
        data: categoryData
    } = useCategories()

    const {
        status: languageStatus,
        data: languageData
    } = useLanguages()

    const theme = useTheme();
    const [authors, setAuthors] = useState([0])
    const [categories, setCategories] = useState([0])
    const [languages, setLanguages] = useState([0])

    const onChangeAuthor = (e) => {
        if (e.target.value.length > 0) {
            setAuthors(e.target.value.filter(i => i != 0))
        }
        else {
            setAuthors([0])
        }

    }
    const onChangeCategory = (e) => {
        if (e.target.value.length > 0) {
            setCategories(e.target.value.filter(i => i != 0))
        }
        else {
            setCategories([0])
        }

    }
    const onChangeLanguage = (e) => {
        if (e.target.value.length > 0) {
            setLanguages(e.target.value.filter(i => i != 0))
        }
        else {
            setLanguages([0])
        }

    }
    const onClickFilter = () => {
        const authorsData = authors.filter(i => i != 0)
        const categoriesData = categories.filter(i => i != 0)
        const languagesData = languages.filter(i => i != 0)
        filterBooks(authorsData, categoriesData, languagesData)
    }
    const onClickReset = () => {
        setAuthors([0])
        setCategories([0])
        setLanguages([0])
        resetBooks()
    }
    return (
        <SoftBox display="flex" flexDirection="row" height="100%" >

            <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
                {/* <InputLabel id="demo-multiple-name-label">Select Author</InputLabel> */}
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={authors}
                    onChange={onChangeAuthor}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                    placeholder='select authors'
                >
                    <MenuItem
                        key={0}
                        value={0}
                        style={getStyles(0, authors, theme)}
                    >
                        Select Authors
                    </MenuItem>
                    {authorStatus && authorData.map((author, index) => (
                        <MenuItem
                            key={index + 1}
                            value={author._id}
                            style={getStyles(author._id, authors, theme)}
                        >
                            {author.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
                {/* <InputLabel id="demo-multiple-name-label">Select Author</InputLabel> */}
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={categories}
                    onChange={onChangeCategory}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                    placeholder='select categories'
                >
                    <MenuItem
                        key={0}
                        value={0}
                    // style={getStyles(0, authors, theme)}
                    >
                        Select Categories
                    </MenuItem>
                    {categoryStatus && categoryData.map((category, index) => (
                        <MenuItem
                            key={index + 1}
                            value={category._id}
                            style={getStyles(category._id, categories, theme)}
                        >
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
                {/* <InputLabel id="demo-multiple-name-label">Select Author</InputLabel> */}
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={languages}
                    onChange={onChangeLanguage}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                    placeholder='select languages'
                >
                    <MenuItem
                        key={0}
                        value={0}
                    // style={getStyles(0, authors, theme)}
                    >
                        Select Languages
                    </MenuItem>
                    {languageStatus && languageData.map((language, index) => (
                        <MenuItem
                            key={index + 1}
                            value={language._id}
                            style={getStyles(language._id, languages, theme)}
                        >
                            {language.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <SoftBox mx={2}>
                <SoftButton variant="gradient" color="info" sx={{ maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP }} onClick={onClickFilter}>
                    Filter Book
                </SoftButton>

            </SoftBox>
            <SoftBox>

                <SoftButton variant="gradient" color="warning" sx={{ maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP }} onClick={onClickReset}>
                    Reset
                </SoftButton>
            </SoftBox>


        </SoftBox>
    )
}
FilterBox.propTypes = {
    filterBooks: PropTypes.func.isRequired,
    resetBooks: PropTypes.func.isRequired
}
export default FilterBox