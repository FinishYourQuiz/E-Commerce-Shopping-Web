import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Tabs, Tab, Box, Typography } from '@material-ui/core';
import Recommand from './Recommand.js';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import './index.css';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            style={{backgroundColor: '#f8f9fa'}}
            // backgroundColor="red"
            {...other}
        >
        {value === index && (
            <Box p={2}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>  
    );
}

const contentStyle = {
    height: '28vw',
    color: '#fff',
    lineHeight: '300px',
    textAlign: 'center',
    background: 'black',
    margin: '0 120px'
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        // backgroundColor: theme.palette.background.paper,
    },
    tabs: {
        fontWeight: 'bolder',
        backgroundColor: '#edc4b3'
    },
    tab: { 
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#cd9777'
    }
}));

export default function ScrollableTabsButtonAuto() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>5</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>6</h3>
                </div >
            </Carousel>
            <Paper style={{}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    className={classes.tabs}
                    TabIndicatorProps={{color: 'black'}}
                    p={4}
                >
                <Tab className={classes.tab} label="Recommand" {...a11yProps(0)} />
                <Tab className={classes.tab} label="Tops" {...a11yProps(1)} />
                <Tab className={classes.tab} label="Skirts" {...a11yProps(1)} />
                <Tab className={classes.tab} label="Gifts" {...a11yProps(3)} />
                <Tab className={classes.tab} label="Item Four" {...a11yProps(4)} />
                <Tab className={classes.tab} label="Item Five" {...a11yProps(5)} />
                <Tab className={classes.tab} label="Item Six" {...a11yProps(6)} />
                <Tab className={classes.tab} label="Item Six" {...a11yProps(7)} />
                <Tab className={classes.tab} label="Item Eight" {...a11yProps(8)} />
                </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
                <Recommand products={0}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Recommand products={1}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Recommand products={2}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Recommand products={3}/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Recommand products={4}/>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <Recommand products={5}/>
            </TabPanel>
            <TabPanel value={value} index={6}>
                <Recommand products={6}/>
            </TabPanel>
            <TabPanel value={value} index={7}>
                <Recommand products={7}/>
            </TabPanel>
            <TabPanel value={value} index={8}>
                <Recommand products={8}/>
            </TabPanel>
        </div>
    );
}