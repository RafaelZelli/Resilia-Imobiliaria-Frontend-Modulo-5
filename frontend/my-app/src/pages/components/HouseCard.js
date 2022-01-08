import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SingleBedIcon from "@material-ui/icons/SingleBed";
import StraightenOutlinedIcon from "@material-ui/icons/StraightenOutlined";
import DatePicker from "./DatePicker";
import Snackbar from "@material-ui/core/Snackbar";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Input from "./Input";
import DialogContent from "@material-ui/core/DialogContent";
import agend from "../functions/agend";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import IconButton from "@material-ui/core/IconButton";
class HouseCard extends React.Component {
  constructor() {
    super();
    this.state = {
      showDates: false,
      selectedDate: new Date(),
      agendado: false,
    };

    this.changeShowDates = this.changeShowDates.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.edit = this.edit.bind(this);
  }

  changeShowDates = () => {
    this.setState({
      showDates: !this.state.showDates,
    });
  };
  handleDateChange = (date) => {
    this.setState({
      date: date,
    });
  };
  closeDialog = () => {
    this.setState({
      showDates: false,
    });
  };
  handleChange = (name, value) => {
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  };

  edit() {
    this.props.onEdit(this.props.id, this.props.type);
  }
  saveVisit = async () => {
    let agendar = await agend(
      this.state.date,
      this.props.id,
      this.state.nome,
      this.state.cpf,
      this.state.telefone
    );
    if (agendar) {
      this.setState({
        agendado: true,
        showDates: false,
      });
    }
  };
  close = () => {
    this.setState({
      agendado: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.agendado}
          autoHideDuration={2000}
          onClose={this.close}
          message="Agendado com sucesso"
        />
        <Card style={{ textAlign: "initial" }} variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {this.props.type}
            </Typography>
            <Typography variant="h6" component="h2">
              {this.props.end}
            </Typography>
            <Typography color="textSecondary">
              {this.props.neighborhood},{this.props.city}
            </Typography>
            <Typography color="textSecondary">
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <div>
                    <SingleBedIcon /> {this.props.rooms}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <StraightenOutlinedIcon /> {this.props.area}m²
                  </div>
                </Grid>
              </Grid>
            </Typography>
            <Typography color="textSecondary">
              Aluguel: R$ {this.props.price}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={this.changeShowDates} size="small">
              Agendar Visita
            </Button>
            <div
              style={{
                "margin-left": "auto",
              }}
            >
              <IconButton aria-label="delete">
                <InfoOutlinedIcon onClick={this.edit} />
              </IconButton>
            </div>
          </CardActions>
        </Card>
        <Dialog
          onClose={this.changeShowDates}
          aria-labelledby="simple-dialog-title"
          open={this.state.showDates}
        >
          <DialogTitle id="simple-dialog-title">Agendar Visita</DialogTitle>
          <DialogContent>
            <DatePicker
              onChange={this.handleDateChange}
              selectedDate={this.state.date}
            />
            <Input
              onChange={this.handleChange}
              name="nome"
              label="Nome"
              margin={true}
              placeholder="Seu nome completo"
            ></Input>
            <Input
              onChange={this.handleChange}
              name="cpf"
              label="CPF"
              margin={true}
              placeholder="Seu CPF"
            ></Input>
            <Input
              onChange={this.handleChange}
              name="telefone"
              label="Telefone"
              margin={true}
              placeholder="Seu telefone"
            ></Input>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.saveVisit} color="primary">
              Agendar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default HouseCard;
