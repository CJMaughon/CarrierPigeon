import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from "@material-ui/pickers";
const AssignmentInfoForm = ({ selectedUsers, names }) => {
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
        due_date: new Date(),
        detail_info: '',
    });
    const {
        name,
        detail_info,
    } = assigmentFormData;
    const onAssignmentFormChange = e =>
        setAssignmentFormData({
            ...assigmentFormData,
            [e.target.name]: e.target.value
        });
    const [selectedDate, handleDateChange] = useState(new Date());
    const items = names.map(a => {
        return (
            <li key={a} className="instructor-item">{a}</li>
        )
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
                    <p className='lead'>Assigned Instructors</p>
                    <ul>
                        {items}
                    </ul>
                    <div className="picker">
                        <DatePicker value={selectedDate} onChange={handleDateChange} />
                    </div>
                    <button className='btn-next' >Submit</button>
                </form>
            </Fragment>

        </div>
    );
};

AssignmentInfoForm.propTypes = {
    selectedUsers: PropTypes.array.isRequired,
    names: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    selectedUsers: state.user.selectedUsers,
    names: state.user.selectedUsersName,
});
export default connect(
    mapStateToProps,
    {}
)(AssignmentInfoForm);