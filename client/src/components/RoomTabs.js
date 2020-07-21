import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Badge from "@material-ui/core/Badge";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#282c34",
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export default function SimpleTabs(props) {

  const tasksArr = props.tasks;
  const participants = tasksArr.length;
  const queuers  = 6- tasksArr.length;
  let waitingArr = queuers ===0 ? [] : Array(queuers).fill('Wating...');
  const totalArr = tasksArr.concat(waitingArr);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -14,
      top: 13,
      padding: '0 4px',
    },
  }))(Badge);


  function showBadge(index, badgeContent) {
    return (
      <StyledBadge badgeContent={badgeContent} color="primary">
        {index} ETH
      </StyledBadge>
    );
  }
  
  let tabStyle = {
    minWidth: 110
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "gray" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          aria-label="simple tabs example"
        >
          <Tab label={showBadge(0.1, participants)} {...a11yProps(0)} style={tabStyle} />
          <Tab label={showBadge(1, 1)} {...a11yProps(1)} style={tabStyle} />
          <Tab label={showBadge(5, 0)} {...a11yProps(2)} style={tabStyle} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
        <List className={classes.root} subheader={<li />}>
          {totalArr.map((sectionId,index) => (
            <li key={`section-${sectionId}-${index}`} className={classes.listSection}>
              <ListItem key={`item-${sectionId}-${index}`}>
                <ListItemText primary={`${sectionId}`} style={{ color: '#FFFFFF' }} />
              </ListItem>
            </li>
          ))}
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}
