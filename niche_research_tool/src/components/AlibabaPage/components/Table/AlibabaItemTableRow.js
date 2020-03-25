import React from 'react'
import {TableRow, TableCell, Link, Checkbox }from '@material-ui/core'
import Image from 'material-ui-image'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import WarningIcon from '@material-ui/icons/Warning';

const  AlibabaItemTableRow = (props) => {
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
          <Image src={item.Images}/>
          </TableCell>
          
          <TableCell>{item.Name}</TableCell>
          <TableCell>{item.PriceRange.Key}</TableCell>
          <TableCell>{item.PriceRange.Value}</TableCell>
          <TableCell>{item.MinimumOrder}</TableCell>
          <TableCell>{item.ResponseRate}</TableCell>
          <TableCell>{item.ReviewScore}</TableCell>
          <TableCell>{item.ReviewCount}</TableCell>
          <TableCell><Link href={item.Link} color="inherit" >Go</Link></TableCell>
          <TableCell>{item.Seller}</TableCell>
          <TableCell><Link href={item.SellerLink} color="inherit" >Go</Link></TableCell>
          <TableCell>{item.SellerTimeOnPlatform}</TableCell>
          <TableCell>{item.Country}</TableCell>
          <TableCell>{item.GoldStatus ? <CheckCircleOutlineIcon color="primary" /> : <WarningIcon color="error"/>}</TableCell>
        </TableRow>
      );
}

export default AlibabaItemTableRow
