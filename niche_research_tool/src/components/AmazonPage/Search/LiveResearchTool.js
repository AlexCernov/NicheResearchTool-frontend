import React, {Fragment, useState, useContext } from 'react'
import {InputBase, Button, CircularProgress} from '@material-ui/core/';
import Search from '@material-ui/icons/Search';
import AmazonItemsTable from '../components/AmazonItemsTable'

const  LiveResearchTool = () => {
    const [isLoading,setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [numberOfItems,setNumberOFItems] = useState(0);
    const [averagePrice,setAveragePrice] = useState(0);
    const [inputText,setInputText] = useState("");
    const [buttonClicked,setButtonClicked] = useState(false)

    const handleInput = event => {
        setInputText(event.target.value);
    }

    const handleClick = () => {
            setButtonClicked(true)
            setLoading(true);
            fetch('https://localhost:44346/api/Amazon?keywords=' + inputText).then(response => response.json()).then(information => {
                setItems(information.Items);
                setNumberOFItems(information.NoOfItems)
                setAveragePrice(information.AveragePrice)
                setLoading(false);
            })
        
    }

    return(
        <Fragment>
        <InputBase variant="outlined" placeholder={'Search...'} startAdornment={<Search />} onChange={handleInput}/>
        <Button onClick={handleClick} variant="contained" color="primary"  >Search</Button><br/>
        {(() => {
            if(isLoading) return <CircularProgress />
            else if(inputText === "" || !buttonClicked) return <div>Please provide the niche</div>
            else {
                   return <Fragment>
                      
                       <AmazonItemsTable items={items} />
                       </Fragment>
            }
        })()}
      </Fragment>

    )
}
export default LiveResearchTool
    
 
