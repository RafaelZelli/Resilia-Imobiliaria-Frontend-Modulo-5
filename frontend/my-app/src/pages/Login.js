import * as React from "react";
import Input from "./components/Input";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import loginFunction from "../pages/functions/login";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "0px !important",
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: "",
      email: "",
      login: "",
      senha: "",
      telefone: "",
      isLogged: false,
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
  }

  handleDateChange = (name, value) => {
    console.log(value);
    this.setState({
      [name]: value,
    });
  };
  create = () => {
    this.props.history.push("/Imobiliaria/create");
  };
  login = async () => {
    let user = await loginFunction(this.state.login, this.state.senha);
    console.log("USER: "+user)
    if (user != "error") {
      this.props.history.push("/Imobiliaria/listProperty?id=" + user.login);
    } else {
      this.setState({
        isLogged: true,
      });
    }
  };
  close = () =>{
    this.setState({
      isLogged: false,
    })
  }
  // nome email login senha telefone
  render() {
    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.isLogged}
          autoHideDuration={6000}
          onClose={this.close}
          message="Usuario não encontrado"
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
            <Grid item xs={12}>
              <Input
                onChange={this.handleDateChange}
                name="login"
                label="Login"
                placeholder="Seu nome"
              ></Input>
            </Grid>{" "}
            <Grid item xs={12}>
              <Input
                onChange={this.handleDateChange}
                name="senha"
                label="Senha"
                placeholder="Sua senha"
                password={true}
              ></Input>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                onClick={this.login}
                color="primary"
                style={{ width: "100%" }}
              >
                Logar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                onClick={this.create}
                color="primary"
                style={{ width: "100%" }}
              >
                Criar Usuário
              </Button>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
export default Login;
