
import React, {Suspense} from 'react'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import PageLayout from "./components/layouts/PageLayout";
import HomePage from './routes/index.js';
import Movies from './components/dashboard/Movies.js'
import Nav from './components/shared/Nav.js'
function App() {
  return(
    <div>


            <Router>
            
                
                    <Switch>
                        <Route exact path="/">
                        	<Nav/>
                            <HomePage />
                        </Route>
                        <Route path="/movies">
                            <Nav/>
                            <Movies/>
                        </Route>
                    </Switch>
                
            </Router>
        

    </div>
  )
}

export default App;
