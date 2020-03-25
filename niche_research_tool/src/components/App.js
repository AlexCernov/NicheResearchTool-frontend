import React from 'react';
import '../App.css';
import 'typeface-roboto';
import AmazonReasearchNiche from './AmazonPage/Search'
import SavedAmazonItems from './AmazonPage/SavedItems'
import AlibabaReasearchNiche from './AlibabaPage/LiveResearchTool'
import SavedAlibabaItems from './AlibabaPage/SavedItems'
import ProjectCreate from './ProjectCreate'
import Layout from './Layout'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Store from '../Store'
import Login from './Login'
import Register from './Register'
import ProtectedRouter from './Common/ProtectedRoute'

const routes = (
  <Switch>
  <ProtectedRouter exact path="/" component={()=> <div>Home page2</div>}/>
  <ProtectedRouter exact path="/amazon" component={AmazonReasearchNiche}></ProtectedRouter>
  {/* <ProtectedRouter exact path="/amazon/saved" component={SavedAmazonItems}></ProtectedRouter> */}
  <ProtectedRouter exact path="/projects/create" component={ProjectCreate}></ProtectedRouter>
  <ProtectedRouter exact path="/alibaba" component={AlibabaReasearchNiche}></ProtectedRouter>
  <ProtectedRouter exact path="/alibaba/saved" component={SavedAlibabaItems}></ProtectedRouter>
  <Route exact path='/login'><Login/></Route>
  <Route exact path='/register' ><Register/></Route>
  <Route render={()=> <div>Not found</div>}/>
  <Route></Route>
  </Switch>
)





export default function App() {

  const google = () => {
    fetch("https://trends.google.com/trends/api/widgetdata/multiline?hl=ro&tz=-120&req=%7B%22time%22:%222019-03-24+2020-03-24%22,%22resolution%22:%22WEEK%22,%22locale%22:%22ro%22,%22comparisonItem%22:%5B%7B%22geo%22:%7B%22region%22:%22RO-BC%22%7D,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22BROAD%22,%22value%22:%22leather+bracelet%22%7D%5D%7D%7D,%7B%22geo%22:%7B%22region%22:%22RO-BC%22%7D,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22BROAD%22,%22value%22:%22silver+bracelet%22%7D%5D%7D%7D%5D,%22requestOptions%22:%7B%22property%22:%22%22,%22backend%22:%22IZG%22,%22category%22:18%7D%7D&token=APP6_UEAAAAAXns3hW0bOC70ssI76_sViThxu254tlz4&tz=-120")
    .then(u => u.json()).then(u=> console.log(u))
  }



  return (
    
    <div>{google}</div>
    // <BrowserRouter>
    //   <Store>
    //   <Layout>
    //     {routes}
    //   </Layout>
    //   </Store>
    // </BrowserRouter>

   
  )
}



