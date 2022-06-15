import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';

import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import WorkIcon from '@material-ui/icons/Work';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Container, Grid } from '@material-ui/core';
// import { Router, Route, Link } from 'react-router';
import { RecentActorsRounded } from '@material-ui/icons';


export const mainListItems = (
  <div>
    <ListItem button >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    {/* <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem> */}
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Applicants" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Activities" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Jobs" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Now signed in as:</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Joe Biden" />
    </ListItem>
    
    {/* <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem> */}
    {/* <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem> */}
  </div>
);

export const applicantIcon =(
  <div>

    <AccessibilityNewIcon style={{fontSize : 150}}></AccessibilityNewIcon> 
    {/* <Container maxWidth="sm">

      <AccessibilityNewIcon style={{fontSize : 100}}></AccessibilityNewIcon>  
    </Container> */}
      
  </div>
);

export const jobIcon =(
  <div>
    <WorkIcon style={{fontSize : 150}}></WorkIcon>
  </div>
);

// React.render((
//   <Router>
//     <Route path="/" component={App}>
//       <Route path="about" component={About} />
//       <Route path="inbox" component={Inbox}>
//         <Route path="messages/:id" component={Message} />
//       </Route>
//     </Route>
//   </Router>
// ), document.body)