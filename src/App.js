import React, {useEffect} from "react";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import PageEvents from "./components/Events";
import PageRestaurants from "./components/Restaurants";
import PageStages from "./components/Stages";
import PagePresenters from "./components/Presenters";
import AppMenu from "./menu/AppMenu";
import { useDispatch } from "react-redux";
import { getMainEvent } from "./redux/actions/events";
import "./App.css"

function App(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const fetchMainEvent = () => dispatch(getMainEvent());
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMainEvent()
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setOpen(!open);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <AppBar position="fixed" color="transparent" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="subtitle1"
              className={classes.title}
              align="right"
            >
              Admin panel
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <AppMenu />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <AppMenu />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/restaurants" component={PageRestaurants} />
              <Route path="/events" component={PageEvents} />
              <Route path="/stages" component={PageStages} />
              <Route path="/presenters" component={PagePresenters} />
            </Switch>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: {
    minHeight: 10,
    backgroundColor: "#EEEEEE",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    backgroundColor: "#EEEEEE",
  },
  container: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
    alignSelf: "center",
    justifySelf: "end",
  },
}));

App.propTypes = {};

export default App;