import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAssignments } from '../../actions/assignment';
import Navbar from '../layout/Navbar'
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const AdminDashboard = ({ getAssignments, assignments, auth: { user } }) => {

  useEffect(() => {
    getAssignments();
  }, [getAssignments]);

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);



  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  }));

  const CustomizedTables = () => {
    const classes = useStyles();

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Assignment Name</StyledTableCell>
              <StyledTableCell align="right">Due Date</StyledTableCell>
              <StyledTableCell align="right">Details</StyledTableCell>
              <StyledTableCell align="right">Number of Instructors</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map(row => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{new Date(row.dueDate).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell align="right">{row.detail}</StyledTableCell>
                <StyledTableCell align="right">{row.assignedInstructors.length}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
  return (
    <section className='landing'>
      <Navbar />
      <div>
        <p className='lead'>
          <i className='fas fa-user' /> Welcome {user && user.name}
        </p>
        <Fragment>
          <Link to='/create_assignment' className='btn btn-primary my-1'>
            Create Assignment
          </Link>
          <CustomizedTables />
        </Fragment>

      </div>
    </section >
  );
};

AdminDashboard.propTypes = {
  getAssignments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  assignments: state.assignment.assignments
});
export default connect(
  mapStateToProps,
  { getAssignments }
)(AdminDashboard);
