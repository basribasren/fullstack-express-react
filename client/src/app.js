import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import compose from "recompose/compose";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Offline from "@material-ui/icons/SignalWifiOff";
import Online from "@material-ui/icons/SignalWifi3Bar";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import publicRoutes from "routes/public.jsx";
import publicSwitch from "lazy/public.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

import {
  getStatusConnection,
  getMetadataConnection,
  closeStatusConnection
} from "redux/action/actionLayout";

class AppShell extends React.Component {
  state = {
    mobileOpen: false,
    tr: this.props.connection.showSnackbar || false
  };

  handleCloseSnackbar = () => {
    this.props.closeStatusConnection;
  };

  showNotification(status) {
    this.props.getStatusConnection(status);
    this.setState({ tr: true });
    setTimeout(
      function() {
        this.props.closeStatusConnection;
        this.setState({ tr: false });
      }.bind(this),
      6000
    );
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getRoute() {
    return this.props.location.pathname !== "/maps";
  }

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  getConnection() {
    return (
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection ||
      navigator.msConnection
    );
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);

    var connectionMetadata = this.getConnection();
    if (connectionMetadata) {
      console.log(connectionMetadata);
      this.props.getMetadataConnection(connectionMetadata);
    }

    window.addEventListener("online", () => {
      this.showNotification(true);
    });
    window.addEventListener("offline", () => {
      this.showNotification(false);
    });
    if (navigator.onLine) {
      this.showNotification(true);
    } else {
      this.showNotification(false);
    }
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  render() {
    const { classes, ...rest } = this.props;
    const msg = this.props.connection.online ? "Online" : "Offline";
    const color = this.props.connection.online ? "success" : "danger";
    let sidebarComp = (
      <Sidebar
        routes={publicRoutes}
        logoText={"Creative Tim"}
        logo={logo}
        image={image}
        handleDrawerToggle={this.handleDrawerToggle}
        open={this.state.mobileOpen}
        color="blue"
        {...rest}
      />
    );
    let headerComp = (
      <Header
        routes={publicRoutes}
        handleDrawerToggle={this.handleDrawerToggle}
        {...rest}
      />
    );
    let switchComp = publicSwitch;

    return (
      <div className={classes.wrapper}>
        {sidebarComp}
        <div className={classes.mainPanel} ref="mainPanel">
          {headerComp}
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchComp}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchComp}</div>
          )}
          {this.getRoute() ? <Footer /> : null}
        </div>
        <Snackbar
          place="bc"
          color={color}
          icon={this.props.connection.online ? Online : Offline}
          message={msg}
          open={this.state.tr}
          closeNotification={this.props.closeStatusConnection}
          close
        />
      </div>
    );
  }
}

AppShell.propTypes = {
  classes: PropTypes.object.isRequired,
  connection: PropTypes.object.isRequired,
  getStatusConnection: PropTypes.func.isRequired,
  getMetadataConnection: PropTypes.func,
  closeStatusConnection: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  connection: state.reducerLayout
});

export default compose(
  withStyles(dashboardStyle),
  connect(
    mapStateToProps,
    {
      getStatusConnection,
      getMetadataConnection,
      closeStatusConnection
    }
  )
)(AppShell);
