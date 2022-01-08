import * as React from "react";
import InputNumber from "./components/InputNumber";
import InputText from "./components/InputText";
import InputArea from "./components/InputArea";
import InputValues from "./components/InputValues";
import Input from "./components/Input";
import Grid from "@material-ui/core/Grid";
import ComboBox from "./components/ComboBox";
import municipios from "./base/municipios.json";
import bairros from "./base/bairros.json";
import Button from "@material-ui/core/Button";
import editHouse from "./functions/editHouse";
import getHouse from "./functions/getHouse";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";

const style = {
  position: "fixed",
  top: "20%",
  left: "50%",
  width: "50%",
  transform: "translate(-50%, 0%)",
  padding: "0px !important",
  margin: "5px",
};
function getCitys() {
  let response = municipios.map((a) => {
    return a.Nome;
  });

  return response.sort();
}
function getNeighborhood(city) {
  let response = bairros.filter((a) => {
    return a.Nome.split("-")[1].trim() === city;
  });
  response = response.map((a) => {
    return a.Nome.split("-")[0].trim();
  });
  return response.sort();
}

var id = 0;
class HouseEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      neighborhoodsOptions: [],
      citys: [],
      errorEdit: false,
      load: false,
      houseId: 0,
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.edit = this.edit.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.close = this.close.bind(this);
    this.changeNeighborhood = this.changeNeighborhood.bind(this);
  }
  edit = async () => {
    console.log(this.state.codigo);
    let type = this.props.type == "Casa" ? "Casa" : "apartamento";
    let response = await editHouse(
      this.state._id,
      type,
      this.state.valor_aluguel,
      this.state.num_quartos,
      this.state.num_suites,
      this.state.num_sala_estar,
      this.state.num_vagas_garagem,
      this.state.area,
      this.state.armario_embutido,
      this.state.descricao,
      this.state.condominio,
      this.state.municipio,
      this.state.bairro,
      this.state.logradouro,
      this.state.numero,
      this.state.complemento,
      this.state.num_sala_jantar,
      this.state.andar,
      this.state.portaria_24,
      this.state.CEP
    );
    console.log("R=" + response);
    if (response != false) {
      this.props.exit();
    } else {
      this.setState({
        errorEdit: true,
      });
    }
  };
  close = () => {
    this.setState({
      errorCreate: false,
    });
  };
  changeNeighborhood = (text) => {
    this.setState({
      bairro: text,
    });
  };
  changeCity = (text) => {
    this.setState({
      municipio: text,
      neighborhoodsOptions: getNeighborhood(text),
    });
  };

  handleDateChange = (name, value) => {
    console.log(name);
    this.setState({
      [name]: value,
    });
  };

  async componentWillMount() {
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
    this.setState({
      citys: getCitys(),
      load: true
    });
    console.log(this.state);
  }
  render() {
    return (
      <React.Fragment>
        {!this.state.load ? (
          <CircularProgress />
        ) : (
          <div>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={this.state.errorEdit}
              autoHideDuration={6000}
              onClose={this.close}
              message="Não foi possivel editar"
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={this.close}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
            <div style={style}>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <InputValues
                    onChange={this.handleDateChange}
                    name="valor_aluguel"
                    label="Aluguel"
                    placeholder="Valor do aluguel"
                    value={this.state.valor_aluguel}
                  />
                </Grid>
                {this.props.type != "Casa" ? (
                  <Grid item xs={4}>
                    <InputValues
                      onChange={this.handleDateChange}
                      name="condominio"
                      label="Condominio"
                      placeholder="Valor do condominio"
                      value={this.state.condominio}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={4}></Grid>
                )}
                <Grid item xs={4}>
                  <InputNumber
                    onChange={this.handleDateChange}
                    name="num_quartos"
                    label="Quartos"
                    placeholder="Nº de quartos"
                    value={this.state.num_quartos}
                  />
                </Grid>
                <Grid item xs={4}>
                  <InputNumber
                    onChange={this.handleDateChange}
                    name="num_suites"
                    label="Suítes"
                    placeholder="Nº de suites"
                    value={this.state.num_suites}
                  />
                </Grid>
                <Grid item xs={4}>
                  <InputNumber
                    onChange={this.handleDateChange}
                    name="num_sala_estar"
                    label="Sala de estar"
                    placeholder="Nº de salas de estar"
                    value={this.state.num_sala_estar}
                  />
                </Grid>
                <Grid item xs={4}>
                  <InputNumber
                    onChange={this.handleDateChange}
                    name="num_vagas_garagem"
                    label="Vagas de garagem"
                    placeholder="Nº de vagas de garagem"
                    value={this.state.num_vagas_garagem}
                  />
                </Grid>
                <Grid item xs={4}>
                  <InputText
                    onChange={this.handleDateChange}
                    name="area"
                    label="Área m²"
                    placeholder="Área do imovel²"
                    value={this.state.area}
                  />
                </Grid>
                <Grid item xs={4}>
                  <ComboBox
                    label="Armário embutido"
                    placeholder="Contem Armarios?"
                    name="armario_embutido"
                    options={["Sim", "Não"]}
                    value={this.state.armario_embutido ? "Sim" : "Não"}
                    onChange={this.handleDateChange}
                  />
                </Grid>
                <Grid item xs={12} style={{ color: "#505050" }}>
                  {this.props.type != "Casa" ? (
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <InputNumber
                          onChange={this.handleDateChange}
                          name="num_sala_jantar"
                          label="Sala de jantar"
                          placeholder="Nº de Salas de jantar"
                          value={this.state.num_sala_jantar}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <InputNumber
                          onChange={this.handleDateChange}
                          name="andar"
                          label="Andar"
                          placeholder="Nº Andar"
                          value={this.state.andar}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <ComboBox
                          placeholder="Portaria 24 Hrs?"
                          options={["Sim", "Não"]}
                          onChange={this.handleDateChange}
                          name="portaria_24"
                          label="Portaria 24 Hrs"
                          value={this.state.portaria_24 ? "Sim" : "Não"}
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={8}>
                  <ComboBox
                    label="Cidade"
                    placeholder="Nome da cidade"
                    name="municipio"
                    options={this.state.citys}
                    onChange={this.changeCity}
                    value={this.state.municipio}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Input
                    label="Bairro"
                    name="bairro"
                    placeholder="Nome do bairro"
                    onChange={this.handleDateChange}
                    value={this.state.bairro}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Input
                    onChange={this.handleDateChange}
                    name="logradouro"
                    label="Endereço"
                    placeholder=" Nome da rua"
                    value={this.state.logradouro}
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <InputNumber
                    onChange={this.handleDateChange}
                    name="numero"
                    label="Numero"
                    placeholder="Nº da casa"
                    value={this.state.numero}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Input
                    onChange={this.handleDateChange}
                    name="complemento"
                    label="Complemento"
                    placeholder="complemento"
                    value={this.state.complemento}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Input
                    onChange={this.handleDateChange}
                    name="CEP"
                    label="CEP"
                    placeholder="cep"
                    value={this.state.CEP}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputArea
                    onChange={this.handleDateChange}
                    name="descricao"
                    label="Descrição"
                    placeholder="Breve descrição do imovel"
                    value={this.state.descricao}
                  />
                </Grid>{" "}
                <Grid item xs={12}>
                  <Button
                    onClick={this.edit}
                    variant="outlined"
                    color="primary"
                    style={{ width: "100%" }}
                  >
                    Salvar
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default HouseEdit;
