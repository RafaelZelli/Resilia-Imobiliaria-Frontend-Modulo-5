import * as React from "react";
import ComboBox from "./components/ComboBox";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import municipios from "./base/municipios.json";
// import bairros from "./base/bairros.json";
import Logo from "../logo.png";
import subLogo from "../sublogo.png";
import Input from "./components/Input";

const style1 = {
  position: "fixed",
  top: "6%",
  left: "50%",
  width: "50%",
  transform: "translate(-50%, 0%)",
  padding: "0px !important",
  margin: "5px",
};
const style2 = {
  position: "fixed",
  top: "23%",
  left: "50%",
  width: "35%",
  transform: "translate(-50%, 0%)",
  padding: "0px !important",
  margin: "5px",
};
const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "50%",
  transform: "translate(-50%, -50%)",
  padding: "0px !important",
};
const roomOpts = ["1", "2", "3","4"];
const valuesOpts = [
  "R$ 2500",
  "R$ 3500",
  "R$ 4500",
  "R$ 5500",
  "R$ 6500",
  "+ R$ 6500",
];

function getCitys() {
  let response = municipios.map((a) => {
    return a.Nome;
  });

  return response.sort();
}
class SearchPage extends React.Component {
  constructor() {
    super();
    this.state = {
      city: "",
      neighborhood: "",
      price: 0.0,
      rooms: 0,
      neighborhoodsOptions: [],
      citys: [],
    };

    this.changeCity = this.changeCity.bind(this);
    this.changeNeighborhood = this.changeNeighborhood.bind(this);
    this.changeRooms = this.changeRooms.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.getHouses = this.getHouses.bind(this);
    this.addHouse = this.addHouse.bind(this);
  }

  changeNeighborhood = (name,text) => {
    console.log(text)
    this.setState({
      neighborhood: text,
    });
  };
  changePrice = (number) => {
    this.setState({
      price: number,
    });
  };
  changeRooms = (number) => {
    this.setState({
      rooms: number,
    });
  };
  changeCity = (text) => {
    this.setState({
      city: text,
    });
  };

  getHouses = () => {
    let query = "?";
    this.state.city != ""
      ? (query = query + "city=" + this.state.city + "&")
      : (query = query);
    this.state.neighborhood != ""
      ? (query = query + "neighborhood=" + this.state.neighborhood + "&")
      : (query = query);
    this.state.price != 0
      ? (query = query + "price=" + this.state.price.split(" ")[1] + "&")
      : (query = query);
    this.state.rooms != 0
      ? (query = query + "rooms=" + this.state.rooms + "&")
      : (query = query);
    console.log("/Imobiliaria/houses" + query);
    this.props.history.push("/Imobiliaria/houses" + query);
  };

  addHouse = () => {
    if (this.props.userLogin) {
      this.props.history.push("/Imobiliaria/add");
    } else {
      this.props.history.push("/Imobiliaria/logar");
    }
  };
  componentWillMount() {
    this.setState({
      citys: getCitys(),
    });
  }

  render() {
    return (
      <React.Fragment>
        {" "}
        <div style={style1}>
          <img src={Logo} alt="logo" />
        </div>
        <div style={style2}>
          <img src={subLogo} alt="IMOBILIARIA" style={{ width: "30%" }} />
        </div>
        <div style={style}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <ComboBox
                label="Cidade"
                placeholder="Cidade"
                options={this.state.citys}
                onChange={this.changeCity}
              />
            </Grid>
            <Grid item xs={4}>
              <Input
                label="Bairro"
                name="bairro"
                placeholder="Bairro"
                onChange={this.changeNeighborhood}
              />
            </Grid>
            <Grid item xs={4}>
              <ComboBox
                label="Quartos"
                placeholder="Número de Quartos"
                options={roomOpts}
                onChange={this.changeRooms}
              />
            </Grid>
            <Grid item xs={4}>
              <ComboBox
                label="Aluguel até "
                placeholder="Aluguel até $$$"
                options={valuesOpts}
                onChange={this.changePrice}
              />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={this.getHouses}
                to="/Houses"
                color="primary"
                style={{ width: "100%" }}
              >
                Buscar
              </Button>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Button
                onClick={this.addHouse}
                color="primary"
                style={{ width: "100%" }}
              >
                Área do Usuario
              </Button>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
export default SearchPage;
