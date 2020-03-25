import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import {
  Chip,
  Divider,
  Card,
  colors,
  Collapse,
  Button,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import MultiSelect from './MultiSelect'

const useStyles = makeStyles({
  root: {},
  chips: {
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: '8px'
  },
  selects: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: colors.grey[50],
    padding: '8px'
  }
});


const Filter = props => {
  const { data, handleFilter, pageLink} = props;
  const {category, clusters, configFilter, exportCountry, freeSample, minOrder, priceFilter, productFeature, snProductAuthTagResult, snCompanyAuthTagResult, supplierLocation} = data
  const classes = useStyles();
  const [chips, setChips] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [clusterIds, setClusterIds] = useState([]);
  const [featureIds, setFeatureIds] = useState([]);
  const [freeSampleIds, setFreeSampleIds] = useState([]);
  const [exportIds, setExportIds] = useState([]);
  const [productAuthIds, setProductAuthIds] = useState([]);
  const [companyAuthIds, setCompanyAuthIds] = useState([]);
  const [supCountryLocationIds, setSupCountryLocationIds] = useState([]);
  const [supLocationIds, setSupLocationIds] = useState([]);
  const [supSuggLocationIds, setSupSuggLocationIds] = useState([]);

  useEffect(() => {
    if(category.monolayerCategoryData != null && category.monolayerCategoryData.values !== null )
    {
        category.monolayerCategoryData.values.forEach(option => {
          if(option.checked && !categoryIds.includes(option.id))
          {
            setCategoryIds([...categoryIds, option.id])
            setChips([...chips,{item : option, category: "category"}])
          }
      })
    }

    (clusters.cpvFeatureData != null && clusters.cpvFeatureData.values !== null) && clusters.cpvFeatureData.values.forEach(option => {
      if(option.checked && !clusterIds.includes(option.id))
      {
        setClusterIds([...clusterIds, option.id])
        setChips([...chips, {item: option, category: "clusters"}])
      }
    })
    console.log(productFeature.productFeatureData)
    if(productFeature.productFeatureData !== null)
    {
      productFeature.productFeatureData.forEach(options => options.values !=null && options.values.forEach(option => {
        if(option.checked && !featureIds.includes(options.title.id + "-" +option.id))
        {
          setFeatureIds([...featureIds, options.title.id + "-" +option.id])
          setChips([...chips, {item: option, category: "feature", classId : options.title.id}])
        }
      }))
    }
    // productFeature.productFeatureData !== null && [...productFeature.productFeatureData].forEach(options => options.values !=null && options.values.forEach(option => {
    //   if(option.checked && !featureIds.includes(options.title.id + "-" +option.id))
    //   {
    //     setFeatureIds([...featureIds, options.title.id + "-" +option.id])
    //     setChips([...chips, {item: option, category: "feature", classId : options.title.id}])
    //   }
    // }))
    
    (freeSample.freeSampleData !== null && freeSample.freeSampleData.values.length >=1) && freeSample.freeSampleData.values.forEach(option => {
      if(option.checked && !freeSampleIds.includes(option.id))
      {
        setFreeSampleIds([...freeSampleIds, option.id])
        setChips([...chips, {item: option, category: "free_sample"}])
      }
    })
    
    snProductAuthTagResult.productAuthTagData !== null && snProductAuthTagResult.productAuthTagData.forEach(options => options.values !== null && options.values.forEach(option => {
      if(option.checked && !productAuthIds.includes(option.id))
      {
        setProductAuthIds([...productAuthIds, option.id])
        setChips([...chips, {item: option, category: "productAuth"}])
      }
    }))
    if(snCompanyAuthTagResult.companyAuthTagData !== null)
    {
      snCompanyAuthTagResult.companyAuthTagData.forEach(options => options.values !== null && options.values.forEach(option => {
        if(option.checked && !companyAuthIds.includes(option.id))
        {
          setCompanyAuthIds([...companyAuthIds, option.id])
          setChips([...chips, {item: option, category: "companyAuth"}])
        }
      }))
    }
    // snCompanyAuthTagResult.companyAuthTagData !== null && snCompanyAuthTagResult.companyAuthTagData.forEach(options => options.values !== null && options.values.forEach(option => {
    //   if(option.checked && !companyAuthIds.includes(option.id))
    //   {
    //     setCompanyAuthIds([...companyAuthIds, option.id])
    //     setChips([...chips, {item: option, category: "companyAuth"}])
    //   }
    // }))
    
    (exportCountry.exportCountryData !== null && exportCountry.exportCountryData.values.length >=1) && exportCountry.exportCountryData.values.forEach(option => {
      if(option.checked && !exportIds.includes(option.id))
      {
        setExportIds([...exportIds, option.id])
        setChips([...chips, {item: option, category: "export_countries"}])
      }
    })
    
    (supplierLocation.countrySupplierLocation !== null && supplierLocation.countrySupplierLocation.length >=1)  && supplierLocation.countrySupplierLocation.forEach(option => {
      if(option.checked && !supCountryLocationIds.includes(option.id))
      {
        setSupCountryLocationIds([...supCountryLocationIds, option.id])
        setChips([...chips, {item: option, category: "sup"}])
      }
    })
    
    supplierLocation.suggestedSupplierLocationData !== null && supplierLocation.suggestedSupplierLocationData.forEach(option => {
      if(option.checked && !supSuggLocationIds.includes(option.id))
      {
        setSupSuggLocationIds([...supSuggLocationIds, option.id])
        setChips([...chips, {item: option, category: "sup_loc_sugg"}])
      }
    })

    supplierLocation.supplierLocationData !== null && supplierLocation.supplierLocationData.forEach(options => options.values !== null && options.values.forEach(option => {
      if(option.checked && !supLocationIds.includes(option.id))
      {
        setSupLocationIds([...supLocationIds, option.id])
        setChips([...chips, {item: option, category: "location"}])
      }
    }))
  }, 
  [data]);

  const handleChipDelete = chip => {
    if(chip.category === "clusters") {
      setClusterIds(clusterIds => clusterIds.filter(c => c !== chip.item.id))
    }
    if(chip.category === "category") {
      setCategoryIds(categoryIds=>categoryIds.filter(c => c !== chip.item.id))
    }
    if(chip.category === "feature") {
      setFeatureIds(featureIds=>featureIds.filter(c =>c.split('-')[1] !== chip.item.id))
    }
    if(chip.category === "free_sample") {
      setFreeSampleIds(freeSampleIds => freeSampleIds.filter(c => c !== chip.item.id))
    }
    if(chip.category === "productAuth") {
      setProductAuthIds(productAuthIds=>productAuthIds.filter(c => c !== chip.item.id))
    }
    if(chip.category === "companyAuth") {
      setCompanyAuthIds(companyAuthIds=>companyAuthIds.filter(c => c !== chip.item.id))
    }
    if(chip.category === "export_countries") {
      setExportIds(exportIds=>exportIds.filter(c => c !== chip.item.id))
    }
    if(chip.category === "sup") {
      setSupCountryLocationIds(supCountryLocationIds=>supCountryLocationIds.filter(c => c !== chip.item.id))
    }
    if(chip.category === "sup_loc_sugg") {
      setSupSuggLocationIds(supSuggLocationIds=>supSuggLocationIds.filter(c => c !== chip.item.id))
    }
    if(chip.category === "location") {
      setSupLocationIds(supLocationIds=>supLocationIds.filter(c => c !== chip.item.id))
    }
    chip.item.checked = false;
    setChips(chips => chips.filter(c => chip.item.id !== c.item.id));
  };

  const handleMultiSelectChange = value => {
    console.log(value.item)
    if(value.item.checked) return;
    value.item.checked = true
    if(value.category === "clusters") setClusterIds([...clusterIds, value.item.id])
    if(value.category === "category") setCategoryIds([...categoryIds, value.item.id])
    if(value.category === "feature") setFeatureIds([...featureIds, value.id + "-" + value.item.id])
    if(value.category === "free_sample") setFreeSampleIds([...freeSampleIds, value.item.id])
    if(value.category === "productAuth") setProductAuthIds([...productAuthIds, value.item.id])
    if(value.category === "companyAuth") setCompanyAuthIds([...companyAuthIds, value.item.id])
    if(value.category === "export_countries") setExportIds([...exportIds, value.item.id])
    if(value.category === "sup") setSupCountryLocationIds([...supCountryLocationIds, value.item.id])
    if(value.category === "sup_loc_sugg") setSupSuggLocationIds([...supSuggLocationIds, value.item.id])
    if(value.category === "location") setSupLocationIds([...supLocationIds, value.item.id])

    setChips([...chips, value])

  };
  const handleApplyFilters = () => {
    var link = pageLink + ";"

    let features = featureIds
    var refine_attr_value = "";
    var param_order = "";
    while(features.length > 0) 
    {
      let id = features.pop();
      refine_attr_value.length === 0 ? refine_attr_value += id : refine_attr_value+= "," + id
      param_order.length === 0 ? param_order +="ATTR-"+id : param_order+= "," + "ATTR-"+id 
    }
     
    let countries = exportIds
    var country = "";
    while(countries.length > 0)
    {
      let id = countries.pop();
      country.length === 0 ? country +=id : country+="," + id
      param_order.length === 0 ? param_order +="ATTR-"+ "CNTRY-" +id : param_order+= "," + "ATTR-"+ "CNTRY-" +id 
    }
    
    link+= "refine_attr_value=" + refine_attr_value + ";" +"country=" + country + ";" + "param_order=" + param_order

    handleFilter && handleFilter(link)
  }
 

  return (
    <>
    <Card className={clsx(classes.root)}>
      <Collapse in={chips.length > 0}>
      <Divider />
      <div className={classes.chips}>
        {chips.map(chip => (
          <Chip
            className={classes.chip}
            deleteIcon={<CloseIcon />}
            key={chip.item.id}
            label={chip.item.name}
            onDelete={() => handleChipDelete(chip)}
          />
        ))}
      </div>
      </Collapse>
      <Divider />
      <div className={classes.selects}>
      { category.monolayerCategoryData.values !== null && <MultiSelect id="category" key="category" options={category.monolayerCategoryData.values} label={category.monolayerCategoryData.title.name}  onChange={handleMultiSelectChange} /> }
      { clusters.cpvFeatureData.values !== null && <MultiSelect id="clusters" key="clusters" options={clusters.cpvFeatureData.values} label={clusters.cpvFeatureData.title.name}  onChange={handleMultiSelectChange} /> }
      { productFeature.productFeatureData !== null && productFeature.productFeatureData.map(item => item.values.length >= 1 && <MultiSelect id="feature" key={item.title.id} classId={item.title.id} options={item.values} label={item.title.name}  onChange={handleMultiSelectChange} />)}
      { (freeSample.freeSampleData !== null && freeSample.freeSampleData.values.length >=1) && <MultiSelect id="free_sample" key="free_sample" options={freeSample.freeSampleData.values} label={freeSample.freeSampleData.title.name}  onChange={handleMultiSelectChange} /> }
      { snProductAuthTagResult.productAuthTagData !== null && snProductAuthTagResult.productAuthTagData.map(item => item.values.length >= 1 && <MultiSelect id="productAuth" key={"productAuth_"+snProductAuthTagResult.productAuthTagData.indexOf(item)} options={item.values} label={item.title.name}  onChange={handleMultiSelectChange} />)}
      { snCompanyAuthTagResult.companyAuthTagData !== null && snCompanyAuthTagResult.companyAuthTagData.map(item => item.values.length >= 1 && <MultiSelect id="companyAuth" key={"companyAuth_"+snCompanyAuthTagResult.companyAuthTagData.indexOf(item)} options={item.values} label={item.title.name}  onChange={handleMultiSelectChange} />)}
      { (exportCountry.exportCountryData !== null && exportCountry.exportCountryData.values.length >=1) && <MultiSelect id="export_countries" key="export_countries" options={exportCountry.exportCountryData.values} label={exportCountry.exportCountryData.title.name}  onChange={handleMultiSelectChange} /> }
      { (supplierLocation.countrySupplierLocation !== null && supplierLocation.countrySupplierLocation.length >=1) ? <MultiSelect id="sup" key="sup_country_loc" options={supplierLocation.suggestedSupplierLocationData} label="Supplier country location"  onChange={handleMultiSelectChange} /> : null }
      { supplierLocation.suggestedSupplierLocationData !== null && <MultiSelect id="sup_loc_sugg" key="sup_loc_sugg" options={supplierLocation.suggestedSupplierLocationData} label="Suggested supplier location"  onChange={handleMultiSelectChange} /> }
      { supplierLocation.supplierLocationData !== null && supplierLocation.supplierLocationData.map(item => item.values.length >= 1 && <MultiSelect id="location" key={"location_"+item.Id} options={item.values} label={item.title.name}  onChange={handleMultiSelectChange} />)}
      </div>
    </Card>
    <Button onClick={handleApplyFilters}> Apply filters</Button>
    </>
  )
        }
export default Filter