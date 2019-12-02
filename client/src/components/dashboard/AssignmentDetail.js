import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSubmissions } from '../../actions/submission';
import SplitPane from 'react-split-pane';
import Button from '@material-ui/core/Button';
import Spinner from '../layout/Spinner';
import './AssignmentDetail.css';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import Navbar from '../layout/Navbar';
const AssignmentDetail = ({ loadingSubmission, submissionItems, getSubmissions, match, auth: { user } }) => {
    useEffect(() => {
        getSubmissions(match.params.id);
    }, [getSubmissions]);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const onAssignmentSelectClick = e => {
        const { id } = e.target.parentNode;
        console.log(id);
        console.log(e.target.parentNode);
        setSelectedIndex(id);
    };
    return (loadingSubmission) ? (
        <Spinner />
    ) : (
            <section className='landing'>
                <Navbar />
                <SplitPane split='vertical' defaultSize='35vw'>
                    <div className='logo-container'>
                        <div>
                            <div className='instructor-heading'>
                                <h2>Instructor Submissions</h2>
                            </div>
                            {submissionItems.map(function (item, idx) {
                                return (
                                    <Button
                                        key={idx}
                                        id={idx}
                                        variant="contained"
                                        component="span"
                                        onClick={onAssignmentSelectClick}>
                                        {item.instructorName} 's Submission
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        {selectedIndex !== -1 &&
                            <div>
                                <h1 className='large'>Submision Detail</h1>
                                <div>
                                    <TextField
                                        id="assignment-name"
                                        label="Instructor Name"
                                        defaultValue={submissionItems[selectedIndex].instructorName}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="assignment-name"
                                        label="Submission Comment"
                                        defaultValue={submissionItems[selectedIndex].comment}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                </div>

                                {submissionItems[selectedIndex].files_url.map(function (item, idx) {
                                    return (
                                        < ListItem key={idx}>
                                            <ListItemIcon>
                                                <FolderIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item}
                                            >
                                            </ListItemText>
                                        </ListItem>
                                    );
                                })}
                            </div>
                        }
                    </div>
                </SplitPane>
            </section >
        );
};

AssignmentDetail.propTypes = {
    getSubmissions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    submissionItems: state.submission.submissions,
    loadingSubmission: state.submission.loadingSubmissions,
});
export default connect(
    mapStateToProps,
    { getSubmissions }
)(AssignmentDetail);
