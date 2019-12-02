import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { createNewAssigment } from '../../actions/assignment';
import { setSelectedUsers } from '../../actions/users';
import { DatePicker } from "@material-ui/pickers";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
const AssignmentInfoForm = ({ createNewAssigment, setSelectedUsers, selectedUsers, names }) => {
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
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        modalPaper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        margin: {
            margin: theme.spacing(1),
        },
        marginIcon: {
            marginLeft: theme.spacing(1),
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
    const [selectedDate, handleDateChange] = useState(null);

    const onUserDeleteButtonClick = e => {
        const { id } = e.target;
        let newSelectedUsers = selectedUsers.slice(0);
        newSelectedUsers.splice(id, 1);
        let newNames = names.slice(0);
        newNames.splice(id, 1);
        setSelectedUsers(newSelectedUsers, newNames);
    }
    const items = names.map((a, index) => {
        return (
            <Button id={index} variant="contained" size="small" key={a} color="primary" className={classes.margin}>
                {a} <i id={index} className={`fas fa-times ${classes.marginIcon}`} onClick={onUserDeleteButtonClick}></i>
            </Button>
        )
    });
    const onSubmit = async e => {
        e.preventDefault();
        await createNewAssigment(name, detail_info, selectedUsers, selectedDate);
        swal.fire({
            icon: 'success',
            title: 'Successfuly Created Assignment!',
        }).then((result) => {
            window.location.href = "./admin_dashboard"
        });
    };
    return (
        <div>
            <Navbar />
            <Fragment>
                <form className='form-b' onSubmit={e => onSubmit(e)}>
                    <p className='lead'>
                        <i className='fas fa-book'></i> New Assignment
                                </p>
                    <div>
                        <TextField
                            required
                            label="Assignment Name"
                            fullWidth
                            name='name'
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={name}
                            onChange={onAssignmentFormChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="filled-multiline-static"
                            label="Assignment Detail"
                            fullWidth
                            multiline
                            rows="2"
                            value={detail_info}
                            name='detail_info'
                            className={classes.textField}
                            onChange={onAssignmentFormChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <p className='lead'>Assigned Instructors</p>
                    <ul>
                        {items}
                    </ul>
                    <div className="picker">
                        <DatePicker label="Due date" value={selectedDate} onChange={handleDateChange} />
                    </div>
                    <button className='btn-next' disabled={name.length === 0 || detail_info.length === 0 || selectedDate === null} >Submit</button>
                    <Link to='/create_assignment'>
                        <button className='btn-back'>Back</button>
                    </Link>
                </form>
            </Fragment>

        </div >
    );
};

AssignmentInfoForm.propTypes = {
    selectedUsers: PropTypes.array.isRequired,
    names: PropTypes.array.isRequired,
    createNewAssigment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    selectedUsers: state.user.selectedUsers,
    names: state.user.selectedUsersName,
    setSelectedUsers: PropTypes.func.isRequired,
});
export default connect(
    mapStateToProps,
    { createNewAssigment, setSelectedUsers }
)(AssignmentInfoForm);