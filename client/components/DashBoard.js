import * as React from "react";
import PropTypes from "prop-types";

//// material ui

// tab function
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// drawer function
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

// react component
import CreateNewProduct from "./CreateNewProduct";
import AllUsers from "./AllUsers";
import AllProducts from "./AllProducts";
import AllOrders from "./AllOrders"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function DashBoard({ history, match }) {
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {["☰"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button id="hamburger" onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor='left'
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            PaperProps={{ style: { marginTop: "22%", padding: "1%", height: "15vh" } }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab label="Create Product" {...a11yProps(0)} />
              <Tab label="Users" {...a11yProps(1)} />
              <Tab label="Products" {...a11yProps(2)} />
              <Tab label="Orders" {...a11yProps(3)} />
            </Tabs>
          </Drawer>
          <Box
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            <TabPanel value={value} index={0}>
              <CreateNewProduct history={history} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <AllUsers history={history} match={match} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <AllProducts history={history} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <AllOrders history={history} />
            </TabPanel>
          </Box>
        </React.Fragment>
      ))}
    </div>
  );
}

export default DashBoard;
