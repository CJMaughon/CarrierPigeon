import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getAssignment, setUploading, submitAssignment } from '../../actions/assignment';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AttachmentIcon from '@material-ui/icons/Attachment';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { green } from '@material-ui/core/colors';
import { Redirect } from 'react-router-dom';
import { userInfo } from 'os';
const formatDate = date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getYear() + 1900}`;
}
const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300,
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing(2),
    },
    icon: {
        marginRight: theme.spacing(1),
    },
    uploadButton: {
        marginLeft: theme.spacing(2),
    },
    buttonProgress: {
        color: green[500],
        marginTop: theme.spacing(3)
    },
}));

const SubmitAssignmentForm = ({ getAssignment, setUploading, submitAssignment, assignment: { assignment, loadingAssignment, isUploadingFiles }, match, auth: { user } }) => {
    const classes = useStyles();

    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const onInputFileChanged = event => {
        setSelectedFiles([...selectedFiles, event.target.files]);
    };

    const onDeleteIconClick = e => {
        const { id } = e.target;
        let newSelectedFiles = selectedFiles.slice(0);
        newSelectedFiles.splice(id, 1);
        setSelectedFiles(newSelectedFiles);
    };

    const onSubmit = async e => {
        e.preventDefault();
        setUploading();
        await submitAssignment(user._id, assignment._id, 'test_user', selectedFiles);
    };
    const fileItems = selectedFiles && selectedFiles.map((files, index) => {
        return (
            <ListItem key={files[0].name} id={index}>
                <ListItemAvatar>
                    <Avatar>
                        <AttachmentIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={files[0].name}
                    secondary={false}
                />
                <ListItemSecondaryAction id={index}>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        id={index}
                        onClick={onDeleteIconClick}>
                        <i className="fas fa-trash-alt" id={index}></i>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    });
    useEffect(() => {
        getAssignment(match.params.id);
    }, [getAssignment]);
    return (loadingAssignment || assignment === null) ? (
        <Spinner />
    ) : (
            <section className='landing'>
                <div className='instructor-landing-inner'>
                    <h1 className='large'>Submit Assignment</h1>
                    <TextField
                        id="assignment-name"
                        label="Assignment Name"
                        defaultValue={assignment.name}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        id="assignment-detail"
                        label="Assignment Detail"
                        multiline
                        rowsMax="8"
                        defaultValue={assignment.detail}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        id="assignment-date"
                        label="Due Date"
                        defaultValue={formatDate(new Date(assignment.dueDate))}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                    <Grid item xs={12} md={6}>
                        <div>
                            <Typography variant="body1" display='inline'>
                                Upload Files
                            </Typography>
                            <input
                                accept="image/*,.pdf,video/*,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                className={classes.input}
                                id="contained-button-file"
                                onChange={onInputFileChanged}
                                type="file"
                                display='inline-block'
                            />
                            <label htmlFor="contained-button-file" className={classes.uploadButton}>
                                <Button variant="contained" component="span" >
                                    <i className="fa fa-upload" aria-hidden="true"></i>Upload
                        </Button>
                            </label>
                        </div>
                        <div >
                            <List dense={false}>
                                {fileItems}
                            </List>
                        </div>
                    </Grid>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={selectedFiles.length === 0 || isUploadingFiles}
                            className={`classes.button ${isUploadingFiles ? 'disabled' : ''}`}
                            onClick={onSubmit}
                        >
                            <i className={`fas fa-paper-plane ${classes.icon}`}></i>
                            Submit
                     </Button>
                    </div>
                    <div>
                        {isUploadingFiles && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </div>
            </section >
        );
};

SubmitAssignmentForm.propTypes = {
    getAssignment: PropTypes.func.isRequired,
    setUploading: PropTypes.func.isRequired,
    assignment: PropTypes.object.isRequired,
    submitAssignment: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    auth: state.auth,
    assignment: state.assignment
});

export default connect(
    mapStateToProps,
    { getAssignment, setUploading, submitAssignment }
)(SubmitAssignmentForm);
