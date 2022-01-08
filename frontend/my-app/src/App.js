import "./App.css";
import HouseAdd from "./pages/HouseAdd";
import Search from "./pages/SearchPage";
import ListHouses from "./pages/ListHouses";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import ListProperty from "./pages/ListProperty";
import { BrowserRouter, Switch, Route } from "react-router-dom";
function App() {

  return (
    <div className="App">
      <header className="App-header">

        <BrowserRouter>
          <Switch>
            <Route path="/Imobiliaria/" exact={true} component={Search} />
            <Route path="/Imobiliaria/logar" component={Login} />
            <Route path="/Imobiliaria/add" component={HouseAdd} />
            <Route path="/Imobiliaria/houses" component={ListHouses} />
            <Route path="/Imobiliaria/create" component={CreateUser} />
            <Route path="/Imobiliaria/listProperty" component={ListProperty} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
