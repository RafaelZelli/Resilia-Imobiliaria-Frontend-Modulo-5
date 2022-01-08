import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SingleBedIcon from "@material-ui/icons/SingleBed";
import StraightenOutlinedIcon from "@material-ui/icons/StraightenOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import getVisits from "../functions/getVisits";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import deleteHouse from "../functions/deleteHouse";
import deleteVisit from "../functions/deletAgend";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

var visits = [];
class PropertyCard extends React.Component {
  constructor() {
    super();
    this.state = {
      showDates: false,
      selectedDate: new Date(),
    };
    this.changeShowDates = this.changeShowDates.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.deleteAgend = this.deleteAgend.bind(this);
  }

  changeShowDates = async () => {
    visits = [];
    visits = await getVisits(this.props.id);
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
    this.setState({
      [name]: value,
    });
  };
  delete = async () => {
    var response = await deleteHouse(this.props.id, this.props.type);
    
    this.props.onUpdate();
  };

  deleteAgend = async (event) => {
    var response = await deleteVisit(event.target.id);
    visits = [];
    visits = await getVisits(this.props.id);
    this.forceUpdate();
  };
  edit() {
    this.props.onEdit(this.props.id, this.props.type);
  }
  render() {
    return (
      <React.Fragment>
        <Card style={{ textAlign: "initial" }} variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {this.props.type}
            </Typography>
            <Typography component="h4">
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
              Ver Visitas
            </Button>
            <div
              style={{
                "margin-left": "auto",
              }}
            >
              <IconButton aria-label="edit">
                <EditIcon onClick={this.edit} />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteOutlineIcon onClick={this.delete} />
              </IconButton>
            </div>
          </CardActions>
        </Card>
        <Dialog
          onClose={this.changeShowDates}
          aria-labelledby="simple-dialog-title"
          open={this.state.showDates}
        >
          <DialogTitle id="simple-dialog-title">Visitas Agendadas</DialogTitle>
          <DialogContent>
            {visits.map((visit) => {
              var data = new Date(visit.data);
              let dataFormatada =
                data.getDate() +
                "/" +
                (data.getMonth() + 1) +
                "/" +
                data.getFullYear();
              return (
                <div style={{ display: "flex" }}>
                  <IconButton name={visit._id} size="small" aria-label="delete">
                    <CloseIcon
                      id={visit._id}
                      onClick={this.deleteAgend}
                    />
                  </IconButton>
                  Data: {dataFormatada} Nome: {visit.nome} Telefone:{" "}
                  {visit.telefone}
                </div>
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default PropertyCard;
