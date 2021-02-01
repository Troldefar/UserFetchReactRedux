import logo from './logo.svg';
import './App.css';
import { HomePage } from './containers/HomePage';
import { UserPage } from './containers/UserPage';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/user/:id" component={UserPage} />
          <Route> 404 </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
