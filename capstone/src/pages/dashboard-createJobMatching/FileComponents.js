import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, suitability, role, status, selected) {
  return { id, date, name, suitability, role, status,  selected };
}

const rows = [
  createData(0, '16 Mar, 2022', 'Elvis Presley', '45%', 'Java Engineer', 'rejected', 312.44),
  createData(1, '16 Mar, 2022', 'Paul McCartney', '78%', 'C Engineer', 'completed', 866.99),
  createData(2, '16 Mar, 2022', 'Tom Scholz', '19%', 'Data Analyst', 'rejected', 100.81),
  createData(3, '16 Mar, 2022', 'Michael Jackson', '99%', 'Java Engineer', 'pending', 654.39),
  createData(4, '15 Mar, 2022', 'Bruce Springsteen', '120%', 'Accountant', 'pending', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Upload Job Descriptions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Applied Role</TableCell>
            <TableCell>Suitability</TableCell>
            <TableCell>Pending Status</TableCell>
            
            {/* <TableCell align="right">Selected or not</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.suitability}</TableCell>
              <TableCell>{row.status}</TableCell>
              {/* <TableCell align="right">{row.selected}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more updates
        </Link>
      </div>
    </React.Fragment>
  );
}
