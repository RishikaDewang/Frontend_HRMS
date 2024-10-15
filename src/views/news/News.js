import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, ListItemIcon } from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews ,createNews,deleteNews } from 'redux/action/actions';
// assets
import FlagIcon from '@mui/icons-material/Flag';
import BasicButtons from 'ui-component/button';
import './style.css'
// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const News = () => {
  const theme = useTheme();
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [titleError, setTitleError] = useState('');
  const handleDelete = (newsId) => {
    console.log("newsId",newsId)
    setSelectedNewsId(newsId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Dispatch an action to trigger the delete saga
    console.log(selectedNewsId);
    dispatch(deleteNews(selectedNewsId));
    setDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setSelectedNewsId(null);
    setDeleteModalOpen(false);
  };
  const dispatch = useDispatch()
  const news = useSelector((state)=>state.fetchNewsReducer.news)
  console.log("news", news)
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTitle(''); // Reset title when closing modal
    setEditorContent(''); // Reset editor content when closing modal
  };

  const handleSave = () => {
    // Handle save action, you can send the title and editorContent to your backend or perform any other actions
    if (!title) {
      setTitleError('Title is required');
      return; // Exit the function if title is not provided
    }
    console.log('Title:', title);
    console.log('Editor Content:', editorContent);
    const requestBody = {
        title: title,
        content: editorContent,
      };
      dispatch(createNews(requestBody))
    handleCloseModal();
  };

  useEffect(()=>{
    dispatch(fetchNews())
  },[])
  return (
    <>
      <MainCard title='News'>
      <Box className="flex-news-Container">

    <BasicButtons name="Create News" handleSaveClick={handleOpenModal} />
  </Box>
  {news && news.map((item,index) => (
        <CardWrapper key={index}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: theme.palette.warning.light,
                      color: theme.palette.error.main
                    }}
                  >
                    <FlagIcon fontSize="inherit" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                  }}
                  primary={<Typography variant="h4">{item.title}</Typography>}
                  secondary={
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: theme.palette.grey[500],
                        mt: 0.5
                      }}
                    >
                     {item.publishedDate} | {item.employeeName}
                    </Typography>
                  }
                />
                <ListItemIcon onClick={() => handleDelete(item.newsId)}>
                  <DeleteOutlineRoundedIcon  style={{color:"red"}}/>
                </ListItemIcon>
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
         ))}
      </MainCard>
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth >
        <DialogTitle  variant="h4">Add News</DialogTitle>
        <DialogContent >
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={Boolean(titleError)}
            helperText={titleError}
          />

          <ReactQuill 
            theme="snow"
            value={editorContent}
            onChange={setEditorContent}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['image'],
              ],
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} variant="contained" color="primary">
            Publish
          </Button>
          <Button onClick={handleCloseModal} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
      open={isDeleteModalOpen}
      onClose={handleCancelDelete}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle variant="h4">Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete this news item?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelDelete} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

News.propTypes = {
  isLoading: PropTypes.bool
};

export default News;