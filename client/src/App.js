import DashBoardContainer from './containers/dashboardContainer';
import AnnotatorContainer from './containers/AnnotatorHomeContainer';
// import Header from './layout/header';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <Switch>
            <Route exact path="/home" component={AnnotatorContainer} />
            <Route path="/label_list" component={DashBoardContainer} />
            <Redirect path="**" to="/home" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
