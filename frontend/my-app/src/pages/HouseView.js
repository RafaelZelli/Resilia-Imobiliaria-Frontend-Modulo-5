import * as React from "react";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SingleBedIcon from "@material-ui/icons/SingleBed";
import StraightenOutlinedIcon from "@material-ui/icons/StraightenOutlined";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import WeekendOutlinedIcon from "@material-ui/icons/WeekendOutlined";
import DirectionsCarOutlinedIcon from "@material-ui/icons/DirectionsCarOutlined";
import SubjectIcon from "@material-ui/icons/Subject";
import KingBedOutlinedIcon from "@material-ui/icons/KingBedOutlined";
import SingleBedOutlinedIcon from "@material-ui/icons/SingleBedOutlined";
import getHouse from "./functions/getHouse";
import QueryBuilderOutlinedIcon from "@material-ui/icons/QueryBuilderOutlined";
// npm install --save-dev @iconify/react @iconify-icons/mdi
import { Icon, InlineIcon } from '@iconify/react';
import wardrobeIcon from '@iconify-icons/mdi/wardrobe';


var id = 0;
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      show: "none",
    };
  }
  async componentDidMount() {
    id = this.props.houseId;
    let type = this.props.type;
    let house = await getHouse(id, type);
    house = house[0];
    for (var name in house) {
      if (house.hasOwnProperty(name)) {
        this.setState({
          [name]: house[name],
        });
      }
    }
    if (type != "Casa") {
      this.setState({
        show: "flex",
      });
    }
    console.log(this.state);
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <div style={{ display: "flex" }}>
            <AttachMoneyIcon />
            <div style={{"margin-left": "5px"}}>Aluguel: R$ {this.state.valor_aluguel}</div>
          </div>
          <div style={{ display: this.state.show }}>
            <AttachMoneyIcon />
            <div style={{"margin-left": "5px"}}>Condominio: R$ {this.state.condominio}</div>
          </div>
          <div style={{ display: "flex" }}>
            <StraightenOutlinedIcon />
            <div style={{"margin-left": "5px"}}>Area: {this.state.area} m²</div>
          </div>
          <div style={{ display: "flex" }}>
            <SingleBedOutlinedIcon />
            <div style={{"margin-left": "5px"}}>Quartos: {this.state.num_quartos}</div>
          </div>
          <div style={{ display: "flex" }}>
            <KingBedOutlinedIcon />
            <div style={{"margin-left": "5px"}}>Suites: {this.state.num_suites}</div>
          </div>
          <div style={{ display: "flex" }}>
            <Icon icon={wardrobeIcon} width="24" height="24" />
            <div  style={{"margin-left": "5px"}}>Armarios: {this.state.armario_embutido ? "Sim" : "Não"}</div>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <WeekendOutlinedIcon />
          <div style={{"margin-left": "5px"}}> Sala de estar: {this.state.num_sala_estar}</div>
        </div>
        <div style={{ display: this.state.show }}>
          <RestaurantIcon />
          <div style={{"margin-left": "5px"}}> Sala de jantar: {this.state.num_sala_jantar}</div>
        </div>
        <div style={{ display: this.state.show }}>
          <QueryBuilderOutlinedIcon />
          <div style={{"margin-left": "5px"}}>Portaria 24h: {this.state.portaria_24 ? "Sim" : "Não"}</div>
        </div>

        <div style={{ display: "flex" }}>
          <DirectionsCarOutlinedIcon />
          <div style={{"margin-left": "5px"}}>Vagas garagem: {this.state.num_vagas_garagem}</div>
        </div>
        <div style={{ display: "flex" }}>
          <LocationCityIcon />
          <div style={{"margin-left": "5px"}}>
            Local: {this.state.logradouro} Nº {this.state.numero}
            {this.state.andar ? "- " + this.state.andar + "º Andar," : ", "}
            {this.state.bairro} - {this.state.municipio}/{this.state.UF}{" "}
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <SubjectIcon />  <div style={{"margin-left": "5px"}}>{this.state.descricao}</div>
        </div>
      </React.Fragment>
    );
  }
}
export default Login;
