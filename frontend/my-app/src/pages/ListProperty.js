import * as React from "react";
import PropertyCard from "./components/PropertyCard";
import Grid from "@material-ui/core/Grid";
import queryString from "query-string";
import getPropertyById from "./functions/getPropertyById";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import HouseEdit from "./HouseEdit";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const style = {
  position: "fixed",
  top: "40%",
  left: "50%",
  width: "70%",
  transform: "translate(-50%, -50%)",
  padding: "0px !important",
  margin: "5px",
};
var id = 0;
var houses = [];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class ListProperty extends React.Component {
  constructor() {
    super();
    this.state = {
      houses: [],
      id: 0,
      loading: true,
      showDialog: false,
      selectId: 0,
    };

    this.update = this.update.bind(this);
  }

  handleDateChange = (name, value) => {
    console.log(value);
    this.setState({
      [name]: value,
    });
  };

  load = async () => {
    houses = await getPropertyById(id);
    console.log(houses);
    houses.map((h) => {
      console.log(h["login_proprietario"]);
    });
    return houses;
  };

  componentDidMount() {
    let params = queryString.parse(this.props.location.search);
    id = params.id;
    console.log("id: " + id);
    this.load().then((data) => {
      this.setState({
        loading: false,
      });
    });
  }

  closeDialog = () => {
    this.setState({
      showDialog: false,
    });
  };
  show = (value, type) => {
    console.log(value);
    this.setState({
      showDialog: true,
      selectId: value,
      selectType: type,
    });
  };
  addHouse = () => {
    this.props.history.push("/Imobiliaria/add?id=" + id);
  };
  update = () => {
    this.setState({
      loading: true,
    });
    this.load().then((data) => {
      this.setState({
        loading: false,
      });
    });
    console.log(houses);
    this.forceUpdate();
  };
  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <CircularProgress />
        ) : (
          <div style={style}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button
                  onClick={this.addHouse}
                  color="primary"
                  style={{ width: "100%" }}
                >
                  Anunciar imovel
                </Button>
              </Grid>
              <div style={{"width": "100%"}}>
              {houses.map((house) => {
                return (
                  <Grid item xs={4}>
                    <PropertyCard
                      onChange={this.handleDateChange}
                      onEdit={this.show}
                      onUpdate={this.update}
                      type={
                        house.portaria_24 != undefined ? "Apartamento" : "Casa"
                      }
                      id={house._id}
                      city={house.municipio}
                      neighborhood={house.bairro}
                      rooms={house.num_quartos}
                      price={house.valor_aluguel}
                      area={house.area}
                    />
                  </Grid>
                );
              })}
              </div>
            </Grid>
            <Dialog
              fullScreen
              onClose={this.closeDialog}
              open={this.state.showDialog}
              TransitionComponent={Transition}
            >
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={this.closeDialog}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
              <DialogTitle id="simple-dialog-title">Editar Casa</DialogTitle>
              <DialogContent>
                <HouseEdit
                  houseId={this.state.selectId}
                  exit={this.closeDialog}
                  type={this.state.selectType}
                />
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ListProperty;
