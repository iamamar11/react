import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Body from './Body/Body';
import Playlist from './Playlist/Playlist';
import './style/mixins.scss'
import Search from './Search/Search';

ReactDOM.render(
  <main>
    <Router>
      <Navbar/>
        <Switch>
          <Route path='/' exact component={Body} />
          <Route path='/playlist' component={Playlist} />
          <Route path ='/search/:id' component={Search}/>
        </Switch>
    </Router>
  </main>,
  document.getElementById('root')
);

