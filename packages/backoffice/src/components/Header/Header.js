import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  header: {
    background: theme.palette.grey[200],
    height: '50px'
  }
}))
const Header = () => {  
  const {header} = useStyles()
  return (
  <header className={header}>header</header>
)}

export default Header;
