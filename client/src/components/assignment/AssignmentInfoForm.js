import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const AssignmentInfoForm = ({ auth: { user } }) => {
    const useStyles = makeStyles(theme => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        dense: {
            marginTop: theme.spacing(2),
        },
        menu: {
            width: 200,
        },
    }));
    const classes = useStyles();
    const [assigmentFormData, setAssignmentFormData] = useState({
        name: '',
        due_date: '',
        detail_info: '',
    });
    const {
        name,
        due_date,
        detail_info,
    } = assigmentFormData;
    const onAssignmentFormChange = e =>
        setAssignmentFormData({
            ...assigmentFormData,
            [e.target.name]: e.target.value
        });
    return (
        <div>
            <Navbar />
            <Fragment>
                <form className='form-b' >
                    <p className='lead'>
                        <i className='fas fa-book'></i> New Assignment
                                </p>
                    <TextField
                        required
                        label="Assignment Name"
                        fullWidth
                        name='name'
                        className={classes.textField}
                        margin="normal"
                        variant="filled"
                        value={name}
                        onChange={onAssignmentFormChange}
                    />
                    <TextField
                        id="filled-multiline-static"
                        label="Assignment Detail"
                        fullWidth
                        multiline
                        rows="3"
                        value={detail_info}
                        name='detail_info'
                        className={classes.textField}
                        onChange={onAssignmentFormChange}
                        margin="normal"
                        variant="filled"
                    />
                    <button className='btn-next' >Submit</button>
                </form>
            </Fragment>

        </div>
    );
};

AssignmentInfoForm.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
    {}
)(AssignmentInfoForm);