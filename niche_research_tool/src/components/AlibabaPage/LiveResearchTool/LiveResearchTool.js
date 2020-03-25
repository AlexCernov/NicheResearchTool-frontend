import React, { useState} from 'react'
import {CircularProgress, Grid, Typography, Collapse } from '@material-ui/core'
import AlibabaItemsTable from '../components/Table/AlibabaItemsTable'
import Filter from '../components/Search'
import Search from '../../Common/SearchField'
import CardInfo from '../../Common/CardInfo'
const  LiveResearchTool = () => {

    const [isLoading,setLoading] = useState(false);
    const [link,setLink] = useState("");
    const [items, setItems] = useState([]);
    const [averagePrice,setAveragePrice] = useState(0);
    const [inputText,setInputText] = useState("");
    const [buttonClicked,setButtonClicked] = useState(false)
    const [FilterData,setFilterData] = useState({})
    

    const handleInput = event => {
        setInputText(event.target.value);
    }

    const handleClick = () => {
            setButtonClicked(true)
            setLoading(true);
            fetch('https://localhost:44346/api/Alibaba?keywords=' + inputText).then(response => response.json()).then(information => {
                setItems(information.Items);
                setLink(information.Link)
                setFilterData(information.FilterData)
                setAveragePrice(information.AveragePrice)
                setLoading(false);
            })
   
    }

    const applyFilters = link => 
    {
        setLoading(true);
        fetch('https://localhost:44346/api/Alibaba?url=' + link).then(response => response.json()).then(information => {
            setItems(information.Items);
            setLink(information.Link)
            setFilterData(information.FilterData)
            setAveragePrice(information.AveragePrice)
            setLoading(false);
        })
    }


   var condition = inputText === "" || !buttonClicked || isLoading

    return(
        <Grid container spacing={4}>
        <Grid item xs='12'>
            <Search handleInput={handleInput} handleClickButton={handleClick} text="Enter the keywords" />
            </Grid>
        <Grid item >
            <Collapse in={!condition}>
            {!condition && <Filter data={FilterData} handleFilter={applyFilters} pageLink={link}/>}
            </Collapse>
            </Grid>
            {isLoading && <CircularProgress />}
            { (inputText === "" || !buttonClicked) && <Grid item xs="12"><Typography variant="h6">Search products to sell in a niche on Alibaba</Typography></Grid>}
            <Collapse in={!condition}>
            { !condition &&
                <Grid container spacing={4}>
                            <Grid item xs><CardInfo title="Average price" text={averagePrice}/></Grid>
                            <Grid item xs><CardInfo title="Average price" text={averagePrice}/></Grid>
                            <Grid item xs><CardInfo title="Average price" text={averagePrice}/></Grid>
                            </Grid> }
            </Collapse>

            <Collapse in={!condition}>
            { !condition && 
                       <Grid item xs>
                       <AlibabaItemsTable items={items} />
                       </Grid>
                       }
            </Collapse>

        
        </Grid>

    )
}

export default LiveResearchTool
