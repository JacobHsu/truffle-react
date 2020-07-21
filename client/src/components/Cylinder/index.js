import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { blueGrey } from '@material-ui/core/colors';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  gary: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[500],
  },
}));

const useBtnStyles = makeStyles({
  root: {
    background: (props) =>
      props.color === 'black'
        ? 'linear-gradient(0.5turn, #212121, #424242, #212121)'
        : 'linear-gradient(0.5turn, #00b0ff, #b3e5fc, #00b0ff)',
    border: (props) => props.color === 'black' ? 0 : '3px #757575 solid' ,
    borderRadius: 0,
    // boxShadow: (props) =>
    //   props.color === 'black'
    //     ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
    //     : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 32,
    padding: '0 30px',
    margin: 0,
  },
});

function MyButton(props) {
  const { color, ...other } = props;
  const classes = useBtnStyles(props);
  return <Button className={classes.root} {...other} />;
}

const TitleButton = styled(Button)({
  background: 'linear-gradient(0.5turn, #00b0ff, #b3e5fc, #00b0ff)',
  border: '3px #757575 ',
  top: '5px',
  height: 22,
  padding: '0 30px',
  color: 'white',
});


export default function FallbackAvatars(props) {
  const classes = useStyles();
  const { num, addr } = props;
  return (
    <div className={classes.root}>
      
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical contained primary button group"
        variant="contained"
      >
        <React.Fragment>
          <div class="center-area">
            <div class="trapezoid-pseudo"><TitleButton color="blue">0.1</TitleButton></div>
          </div>
          <MyButton color="blue">奖金池金额 ETH</MyButton>
          <MyButton color="black">{addr}</MyButton>
        </React.Fragment>
      </ButtonGroup>
      
      <Avatar alt="Remy Sharp" src="/broken-image.jpg" className={classes.gary}>
        {num} 
      </Avatar>
      <Avatar src="/broken-image.jpg" />
    </div>
  );
}
