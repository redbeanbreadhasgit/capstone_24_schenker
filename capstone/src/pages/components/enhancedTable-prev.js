import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

function decreasingSorting(x,y,whichSorted){
  if (x[whichSorted]<y[whichSorted]){
    return 1;
  }
  else if (x[whichSorted]>y[whichSorted]) {
    return  -1;
  }
  return 0;
}

function sortOnId(props){
  const {array, whichId, order} = props;
  if (order === 'asc'){
    array.sort  (decreasingSorting)
  }
}

function enhancedTableHead(props){

  const {tableHead, orderBy, order} = props;

  return (
    <TableHead>
      <TableRow>
        {tableHead.map (eachHeadCell => 
          (<TableCell
            id = {eachHeadCell.id}>
              <TableSortLabel
                onClick={sortOnId(eachHeadCell.id)}
                Active= {orderBy === eachHeadCell.id}
                direction='asc'>
                {eachHeadCell.label}
              </TableSortLabel>
            </TableCell>
          ))
        }
      </TableRow>
    </TableHead>
  

  )
}