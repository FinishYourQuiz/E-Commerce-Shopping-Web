import { Tab, Grid, Image } from 'semantic-ui-react'
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import { AutoSizer, Column, Table } from 'react-virtualized';

const products = [
    {
        id: 0,
        title: 'T-shirt',
        photo: 'https://tse3-mm.cn.bing.net/th/id/OIP.rZcjVjgvR0_eIJFnICFX8gHaHa?w=183&h=183&c=7&o=5&dpr=2&pid=1.7',
        price: 20,
        tags: ['gift', 'christmas', 'mom']
    }, {
        id: 1,
        title: 'Pant',
        photo: 'https://tse4-mm.cn.bing.net/th/id/OIP.rVjrCvApjlC8MB7uSDU-6gHaJ4?w=183&h=244&c=7&o=5&dpr=2&pid=1.7',
        price: 20,
        tags: ['gift', 'christmas', 'mom']
    }, {
        id: 2,
        title: 'Socks',
        photo: 'https://tse4-mm.cn.bing.net/th/id/OIP.FWx25a_Ks4zsjsYGcxKW3QAAAA?w=127&h=184&c=7&o=5&dpr=2&pid=1.7',
        price: 20,
        tags: ['gift', 'christmas', 'mom']
    }, {
        id: 3,
        title: 'Jacket',
        photo: 'https://tse2-mm.cn.bing.net/th/id/OIP.gGqz_a7tYd7FKqWxQI53owHaHa?w=158&h=180&c=7&o=5&dpr=2&pid=1.7',
        price: 20,
        tags: ['gift', 'christmas', 'mom']
    }, {
        id: 4,
        title: 'Shoe',
        photo: 'https://tse3-mm.cn.bing.net/th/id/OIP.iU9buJicRBOG4c1GA_x8xAHaHa?w=183&h=183&c=7&o=5&dpr=2&pid=1.7',
        price: 20,
        tags: ['gift', 'christmas', 'mom']
    }, {
        id: 5,
        title: 'Skirt',
        photo: 'https://tse3-mm.cn.bing.net/th/id/OIP.iU9buJicRBOG4c1GA_x8xAHaHa?w=183&h=183&c=7&o=5&dpr=2&pid=1.7',
        price: 20,
        tags: ['gift', 'christmas', 'mom']
    }, {
        id: 6,
        title: 'Skirt',
        photo: 'https://tse3-mm.cn.bing.net/th/id/OIP.iU9buJicRBOG4c1GA_x8xAHaHa?w=183&h=183&c=7&o=5&dpr=2&pid=1.7',
        price: 20,
        tags: ['gift', 'christmas', 'mom']
    }, {
        id: 6,
        title: 'Skirt',
        photo: 'https://tse3-mm.cn.bing.net/th/id/OIP.iU9buJicRBOG4c1GA_x8xAHaHa?w=183&h=183&c=7&o=5&dpr=2&pid=1.7',
        price: 20,
        tags: ['gift', 'christmas', 'mom']
    }, {
        id: 6,
        title: 'Skirt',
        photo: 'https://tse3-mm.cn.bing.net/th/id/OIP.iU9buJicRBOG4c1GA_x8xAHaHa?w=183&h=183&c=7&o=5&dpr=2&pid=1.7',
        price: 20,
        tags: ['gift', 'christmas', 'mom']
    }, {
        id: 6,
        title: 'Skirt',
        photo: 'https://tse3-mm.cn.bing.net/th/id/OIP.iU9buJicRBOG4c1GA_x8xAHaHa?w=183&h=183&c=7&o=5&dpr=2&pid=1.7',
        price: 20,
        tags: ['gift', 'christmas', 'mom']
    }
] 


    
const styles = (theme) => ({                          
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    table: {
        '& .ReactVirtualized__Table__headerRow': {
            flip: false,
            paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
        },
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    },
});
    
class MuiVirtualizedTable extends React.PureComponent {
    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };
    
    getRowClassName = ({ index }) => {
        const { classes, onRowClick } = this.props;
    
        return clsx(classes.tableRow, classes.flexContainer, {
        [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };
    
    cellRenderer = ({ cellData, columnIndex }) => {
        const { columns, classes, rowHeight, onRowClick } = this.props;
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{ height: rowHeight }}
                align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
            >
                {cellData}
            </TableCell>
        );
    };
    
    headerRenderer = ({ label, columnIndex }) => {
        const { headerHeight, columns, classes } = this.props;
    
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{ height: headerHeight }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>{label}</span>
            </TableCell>
        );
    };
    
    render() {
        const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
        return (
        <AutoSizer>
            {({ height, width }) => (
            <Table
                height={height}
                width={width}
                rowHeight={rowHeight}
                gridStyle={{
                direction: 'inherit',
                }}
                headerHeight={headerHeight}
                className={classes.table}
                {...tableProps}
                rowClassName={this.getRowClassName}
            >
                {columns.map(({ dataKey, ...other }, index) => {
                return (
                    <Column
                    key={dataKey}
                    headerRenderer={(headerProps) =>
                        this.headerRenderer({
                        ...headerProps,
                        columnIndex: index,
                        })
                    }
                    className={classes.flexContainer}
                    cellRenderer={this.cellRenderer}
                    dataKey={dataKey}
                    {...other}
                    />
                );
                })}
            </Table>
            )}
        </AutoSizer>
        );
    }
}
    
MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
        dataKey: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        numeric: PropTypes.bool,
        width: PropTypes.number.isRequired,
        }),
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

const sample = [
    ['Frozen yoghurt', 159, 6.0, 24, 4.0],
    ['Ice cream sandwich', 237, 9.0, 37, 4.3],
    ['Eclair', 262, 16.0, 24, 6.0],
    ['Cupcake', 305, 3.7, 67, 4.3],
    ['Gingerbread', 356, 16.0, 49, 3.9],
];

function createData(id, dessert, calories, fat, carbs, protein) {
    return { id, dessert, calories, fat, carbs, protein };
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
    const randomSelection = sample[Math.floor(Math.random() * sample.length)];
    rows.push(createData(i, ...randomSelection));
}

function pane() {
    return (
        <Paper style={{ height: 400, width: '100%' }}>
            <VirtualizedTable
                rowCount={rows.length}
                rowGetter={({ index }) => rows[index]}
                columns={[
                {
                    width: 200,
                    label: 'Dessert',
                    dataKey: 'dessert',
                },
                {
                    width: 120,
                    label: 'Calories\u00A0(g)',
                    dataKey: 'calories',
                    numeric: true,
                },
                {
                    width: 120,
                    label: 'Fat\u00A0(g)',
                    dataKey: 'fat',
                    numeric: true,
                },
                {
                    width: 120,
                    label: 'Carbs\u00A0(g)',
                    dataKey: 'carbs',
                    numeric: true,
                },
                {
                    width: 120,
                    label: 'Protein\u00A0(g)',
                    dataKey: 'protein',
                    numeric: true,
                },
                ]}
            />
        </Paper>
    );
}
const panes = [
    { menuItem: 'All Products', render: () => pane() },
    { menuItem: 'Clothes', render: () => pane() },
    { menuItem: 'Shoes', render: () => pane() },
    { menuItem: 'Books', render: () => pane() },
    { menuItem: 'Electronics', render: () => pane() },
    { menuItem: 'Electronics', render: () => pane() },
    { menuItem: 'Electronics', render: () => pane() },
    { menuItem: 'Electronics', render: () => pane() },
    { menuItem: 'Electronics', render: () => pane() },
    { menuItem: 'Electronics', render: () => pane() },
    { menuItem: 'Electronics', render: () => pane() },
    { menuItem: 'Electronics', render: () => pane() },
    { menuItem: 'Electronics', render: () => pane() },
    { menuItem: 'Electronics', render: () => pane() },
]

const TabExampleVerticalTabular = () => (
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
)

export default TabExampleVerticalTabular