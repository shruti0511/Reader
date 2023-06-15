import React from 'react'
import Proptypes from 'prop-types'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import defaultBookImage from "assets/images/default-images/defaultBookImage.jpg"
import { useNavigate } from 'react-router-dom';


const BookList = ({ books }) => {
    const navigate = useNavigate()
  return (
      <List sx={{ width: '100%',  bgcolor: 'background.paper' }} m={4}>
          {books && books.map((book, index) =>
          {
            var imageSrc = book.image ? process.env.REACT_APP_SERVER_API + book.imagePath + "/" + book.image : defaultBookImage;
              return (
                  <ListItem
                      key={index}
                      sx={{ marginTop: '25px', marginLeft:'10px' }}
                      secondaryAction={
                        <IconButton edge="end" aria-label="comments">
                              <InfoIcon
                                onClick={() => { navigate(`/bookDetail/${book._id}`) }}
                              />
                        </IconButton>
                      }
                  >
                <ListItemAvatar>
                    <Avatar alt={book.title} src={imageSrc} />
                </ListItemAvatar>
                <ListItemText primary={book.title} secondary={book.author.name} />
              </ListItem>
              )

          })}
  </List>
  )
}
BookList.propTypes = {
    books:Proptypes.array.isRequired
}
export default BookList