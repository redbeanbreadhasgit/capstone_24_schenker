import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems,  } from '../components/listItems';
import { applicantIcon, jobIcon } from '../components/icons';
import { Button, ThemeProvider } from '@material-ui/core';
import {ReturnApplicantInfo,ReturnApplicantName,ReturnApplicantInfoTable, Reprofile} from './GetApplicantInfo';

import {mainTheme} from "../themes/mianTheme";
import {mainStyle} from "../styles/mainStyle";



export default function DashBoard_homepage() {
  const classes = mainStyle();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ThemeProvider theme={mainTheme}>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Applicant : CV - <ReturnApplicantName></ReturnApplicantName>
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      </ThemeProvider>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={10}>
            {/* number of applicants */}
            {/* <Paper className={fixedHeightPaper}> */}
            <Grid container item xs={12} md={12} lg={12} spacing={6}>  
              <Grid item xs={12} md={12} lg={12}>
                {/* <Paper className={classes.paper}> */}
                <ReturnApplicantInfo></ReturnApplicantInfo>
               {/* </Paper>  */}
              </Grid>        
              <Grid item xs={12} md={12} lg={12}>
                {/* <Paper className={classes.paper}> */}
                <ReturnApplicantInfoTable></ReturnApplicantInfoTable>
               {/* </Paper>  */}
              </Grid>   
              <Grid item xs={12} md={12} lg={12}>
                {/* <Paper className={classes.paper}> */}
                <Reprofile></Reprofile>
               {/* </Paper>  */}
              </Grid> 
            </Grid>
            {/* <h4>{b}</h4> */}
            {/* </Paper> */}
            {/* number of jobs */}
            
            {/* Filter */}
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Filter />
              </Paper>
            </Grid> */}
            {/* Recent Orders */}
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid> */}
          </Grid>
          {/* <Box pt={4}>
            <Copyright />
          </Box> */}
        </Container>
      </main>
    </div>
  );
}
