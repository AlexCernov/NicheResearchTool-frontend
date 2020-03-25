import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TopBar from './TopBar'
import NavBar from './NavBar'
import UserContext from '../../Store/context/user.context'

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  topBar: {
    zIndex: 2,
    position: 'relative'
  },
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  navBar: {
    zIndex: 3,
    width: 256,
    minWidth: 256,
    flex: '0 0 auto'
  },
  content: {
    overflowY: 'auto',
    flex: '1 1 auto',
    padding: '16px' 
  }
}));


const Layout = (props) => {
    const { children } = props;
    const classes = useStyles();
    const [openNavBarMobile, setOpenNavBarMobile] = useState(false);
    const { isAuthenticated } = React.useContext(UserContext)
    const handleNavBarMobileOpen = () => {
      setOpenNavBarMobile(true);
    };
  
    const handleNavBarMobileClose = () => {
      setOpenNavBarMobile(false);
    };
  

    return (
      <div className={classes.root}>
      <TopBar
        className={classes.topBar}
        onOpenNavBarMobile={handleNavBarMobileOpen}
      />
      
      <div className={classes.container}>
      { isAuthenticated && (
        <NavBar
        className={classes.navBar}
        onMobileClose={handleNavBarMobileClose}
        openMobile={openNavBarMobile}
      />
      )}
        
        <main className={classes.content}>
        
            {children}
      
        </main>
      </div>
    </div>
    );
}
export default Layout