import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { createNewAssigment } from '../../actions/assignment';
import { DatePicker } from "@material-ui/pickers";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
const AssignmentInfoForm = ({ createNewAssigment, selectedUsers, names }) => {
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
    }));
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        window.location.href = "./admin_dashboard"
    }

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
    const items = names.map(a => {
        return (
            <li key={a} className="instructor-item">{a}</li>
        )
    });
    const onSubmit = async e => {
        e.preventDefault();
        await createNewAssigment(name, detail_info, selectedUsers, selectedDate);
        handleOpen();
    };
    return (
        <div>
            <Navbar />
            <Fragment>
                <form className='form-b' onSubmit={e => onSubmit(e)}>
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
                        <DatePicker label="Due date" value={selectedDate} onChange={handleDateChange} />
                    </div>
                    <button className='btn-next' disabled={name.length === 0 || detail_info.length === 0 || selectedDate === null} >Submit</button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className={classes.modalPaper}>
                                <p className='lead'>
                                    <i className='fas fa-check'></i> Successfully Created New Assignment.
                                </p>
                            </div>
                        </Fade>
                    </Modal>
                </form>
            </Fragment>

        </div>
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
});
export default connect(
    mapStateToProps,
    { createNewAssigment }
)(AssignmentInfoForm);