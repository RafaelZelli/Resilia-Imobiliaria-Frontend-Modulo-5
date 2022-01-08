import * as React from "react";
import InputNumber from "./components/InputNumber";
import InputText from "./components/InputText";
import InputArea from "./components/InputArea";
import InputValues from "./components/InputValues";
import Input from "./components/Input";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ComboBox from "./components/ComboBox";
import ToogleButton from "./components/ToogleButton";
import municipios from "./base/municipios.json";
import queryString from "query-string";
//import bairros from "./base/bairros.json";
import saveHouse from "./functions/saveHouse";

const style = {
  position: "fixed",
  top: "15%",
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


var id = "";
class HouseAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      valor_aluguel: 0,
      num_quartos: 0,
      num_suites: 0,
      num_sala_estar: 0,
      num_vagas_garagem: 0,
      area: "",
      armario_embutido: false,
      descricao: "",
      condominio: "",
      municipio: "",
      bairro: "",
      logradouro: "",
      numero: 0,
      complemento: "",
      num_sala_jantar: 0,
      andar: 0,
      portaria_24: false,
      CEP: "",
      neighborhoodsOptions: [],
      citys: [],
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.salvar = this.salvar.bind(this);
  }
  salvar = async () => {
    let type = !this.state.house ? "Casa" : "apartamento";
    let response = await saveHouse(
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
      this.state.CEP,
      id
    );
    console.log(response);
    if (response != false) {
      this.props.history.push("/Imobiliaria/");
    } else {
      this.setState({
        errorCreate: true,
      });
    }
  };
  close = () => {
    this.setState({
      errorCreate: false,
    });
  };

  handleDateChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  componentWillMount() {
    let params = queryString.parse(this.props.location.search);
    id = params.id;
    console.log("ID=" + id);
    this.setState({
      citys: getCitys(),
    });
  }
  render() {
    return (
      <React.Fragment>
        <div style={style}>
          <Grid container spacing={1}>
            <Grid item xs={12} style={{ color: "#505050" }}>
              Casa
              <ToogleButton onChange={this.handleDateChange} name="house" />
              Apartamento
            </Grid>
            <Grid item xs={8}>
              <InputValues
                onChange={this.handleDateChange}
                name="valor_aluguel"
                label="Aluguel"
                placeholder="Valor do aluguel"
                value={this.state.valor_aluguel}
              />
            </Grid>
            {this.state.house ? (
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
              {this.state.house ? (
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
                onChange={this.handleDateChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Input
                label="Bairro"
                placeholder="Nome do bairro"
                name="bairro"
                onChange={this.handleDateChange}
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
                onClick={this.salvar}
                variant="outlined"
                color="primary"
                style={{ width: "100%" }}
              >
                Salvar
              </Button>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default HouseAdd;
