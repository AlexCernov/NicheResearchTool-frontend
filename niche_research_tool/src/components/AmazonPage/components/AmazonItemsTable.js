import React, {Fragment, useState} from 'react'
import {Paper, Table, TableBody, TableContainer, TableCell, TableRow, TablePagination} from '@material-ui/core'
import EnhancedTableHead from '../../Common/TableHead'
import {makeStyles} from '@material-ui/core/styles';
import AmazonItemTableRow from './AmazonItemTableRow';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));


export default function AmazonItemsTable (props) {

  const {items} = props;
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = event => {
      if (event.target.checked) {
        const newSelecteds = items.map(n => n.Id);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const headCells = [
      { id: 'Id', numeric: true, disablePadding: true, label: 'Id' },
      { id: 'Image', numeric: false, disablePadding: true, label: 'Image' },
      { id: 'Name', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'Rating', numeric: true, disablePadding: true, label: 'Rating (out of 5)' },
      { id: 'Price', numeric: true, disablePadding: true, label: 'Price' },
      { id: 'ASIN', numeric: true, disablePadding: true, label: 'ASIN' },
      { id: 'Link', numeric: false, disablePadding: true, label: 'Link' },
      { id: 'Prime', numeric: false, disablePadding: true, label: 'Prime' },
    ];

  
    const isSelected = name => selected.indexOf(name) !== -1;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);
        return(
        <Fragment>
          <Paper className={classes.paper}>
            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={items.length}
                        headCells={headCells}
                      />
                      <TableBody>
                {stableSort(items, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = isSelected(row.Id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return <AmazonItemTableRow 
              item = {row} 
              handleClick = {handleClick}
              isItemSelected = {isItemSelected}
              label = {labelId}
              />
            })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
                      
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </Fragment>
        )     
    
}

