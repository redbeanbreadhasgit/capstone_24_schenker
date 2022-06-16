import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Subtitles } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

// filter stuffs import
import { Radio, FormControl, FormLabel, FormControlLabel, RadioGroup, } from '@material-ui/core';


// Generate Order Data
function createData(id, title, e1, e2, e3, e4, e5, e6) {
  return { id, title, e1, e2, e3, e4, e5, e6 };
}

const rows = [
  createData(0, 'Exprience:', '< 1 year', '1 ~ 3 years', '3 ~ 5 years', '5 ~ 10 years', '> 10 years', ''),
  createData(1, 'Skills:', 'Java', 'C#', 'C++', 'Python', 'C', 'Other'),
  createData(2, 'Educational Level:', 'Secondary', 'College', 'University', 'PhD', 'Other', '' ),
//   createData(3, '16 Mar, 2022', 'Michael Jackson', '99%', 'Java Engineer', 'pending', 654.39),
//   createData(4, '15 Mar, 2022', 'Bruce Springsteen', '120%', 'Accountant', 'pending', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Filter() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Applicant Filter</Title>
      <Typography component="p" variant="h10">
        Click to filter
      </Typography>

      {/* <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
          <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
        </RadioGroup>
      </FormControl> */}

      {/* older version */}
      <Table size="small">
        <TableHead>
          <TableRow>
        
            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell> 
              <TableCell>{row.e1}</TableCell>
              <TableCell>{row.e2}</TableCell>
              <TableCell>{row.e3}</TableCell>
              <TableCell>{row.e4}</TableCell>
              <TableCell>{row.e5}</TableCell>
              <TableCell>{row.e6}</TableCell>
              <TableCell align="right">{row.selected}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more
        </Link>
      </div>
    </React.Fragment>
  );
}
