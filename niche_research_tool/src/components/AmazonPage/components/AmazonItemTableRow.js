import React from 'react'
import {TableRow, TableCell, Link, Checkbox }from '@material-ui/core'
import Image from 'material-ui-image'
export default function AmazonItemTableRow(props) {
    const {isItemSelected,handleClick, item, label} = props


    return(
        <TableRow
          hover
          onClick={event => handleClick(event, item.Id)}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={item.Id}
          selected={isItemSelected}
        >
          <TableCell padding="checkbox">
            <Checkbox
              checked={isItemSelected}
              inputProps={{ 'aria-labelledby': label }}
            />
          </TableCell>
          <TableCell component="th" id={label} scope="row" padding="none">
            {item.Id}
          </TableCell>
          <TableCell><Image src={item.Image}/></TableCell>
          <TableCell>{item.Name}</TableCell>
          <TableCell>{item.Rating}</TableCell>
          <TableCell>{item.Price}</TableCell>
          <TableCell>{item.ASIN}</TableCell>
          <TableCell><Link href={item.Link} color="inherit" >Go</Link></TableCell>
          <TableCell>{item.Prime}</TableCell>
        </TableRow>
      );
}

