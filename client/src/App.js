import { Route, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Home, Landing, Detail, Form } from './views'

function App() {
  const location = useLocation();
  return (
    <div className="App">
    {location.pathname !== "/" && <NavBar />}
      {/* <Route exact path="/">
        <Landing />
      </Route> */}
      <Route exact path="/" component={Landing} />
      <Route exact path="/detail" component={Detail} />
      <Route exact path="/create" component={Form} />

      {/* <Route path="/home">
        <Home />
      </Route> */}
      <Route path="/home" render={() => <Home />} />
    </div>
  );
}

export default App;
