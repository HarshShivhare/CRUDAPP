import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  Input,
  InputLabel,
  TableCell,
  TableRow,
  Table,
  Checkbox,
  FormControlLabel,
  FormControl
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { add, edit } from "./action";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import "./styles.css";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    this.state = {
      product_name: "",
      product_description: "",
      is_active: "",
      price: "",
      offer_price: "",
      offer_start_at: currentDate.toString(),
      offer_end_at: currentDate.toString(),
      created_at: currentDate.toString(),
      updated_at: currentDate.toString()
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.flag) {
      return { ...prevState };
    } else if (nextProps.data.modalName === "editProduct") {
      return { ...nextProps.data.rowData };
    } else if (nextProps.data.modalName === "addProduct") {
      const currentDate = new Date();
      return {
        product_name: "",
        product_description: "",
        is_active: "",
        price: "",
        offer_price: "",
        offer_start_at: currentDate.toString(),
        offer_end_at: currentDate.toString(),
        created_at: currentDate.toString(),
        updated_at: currentDate.toString(),
        flag: true
      };
    } else {
      return null;
    }
  }

  handleSave = () => {
    if (this.props.data.modalName === "editProduct") {
      this.props.edit(this.state, this.props.data.index);
    } else {
      this.props.add(this.state);
    }
    this.handleCancel();
  };

  handleCancel = () => {
    this.setState({
      flag: false
    });
    this.props.modalHandler();
  };

  handleChange = () => {
    this.setState({
      is_active: !this.state.is_active
    });
  };

  handleDateChange = (date, name) => {
    this.setState({
      [name]: date.toString()
    });
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  renderDatePicker = row => {
    const pickerID = [
      "offer_start_at",
      "offer_end_at",
      "created_at",
      "updated_at"
    ];
    return pickerID.map((ele, index) => {
      return (
        <TableRow key={index}>
          <TableCell>
            <span>{ele.replace(/_/gi, " ")}</span>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disabled={false}
                className="pading-right"
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                value={this.state[ele]}
                onChange={e => this.handleDateChange(e, ele)}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </TableCell>
        </TableRow>
      );
    });
  };

  renderInputs = (name, id) => (
    <FormControl>
      <InputLabel htmlFor="standard-adornment-amount">{name}</InputLabel>
      <Input
        name={id}
        id={id}
        label={name}
        value={this.state[id]}
        className="pading-right"
        onChange={this.changeHandler}
        aria-describedby="standard-weight-helper-text"
        inputProps={{
          "aria-label": "weight"
        }}
      />
    </FormControl>
  );

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogActions>
          <Table>
            <TableRow>
              <TableCell>
                <h2>
                  {this.props.data.modalName === "addProduct"
                    ? "Add Product"
                    : "Edit Product"}
                </h2>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {this.renderInputs("Product Name", "product_name")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {this.renderInputs(
                  "Product Description",
                  "product_description"
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.is_active}
                      onChange={this.handleChange}
                      name="is_active"
                    />
                  }
                  label="Offer Active"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {this.renderInputs("Price", "price")}
                {this.renderInputs("Offer Price", "offer_price")}
              </TableCell>
            </TableRow>
            {this.renderDatePicker()}
            <TableRow>
              <TableCell>
                <Button onClick={this.handleSave} color="primary">
                  Save
                </Button>
                <Button onClick={this.handleCancel} color="primary" autoFocus>
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          </Table>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapDispatchToProps = {
  add,
  edit
};

export default connect(null, mapDispatchToProps)(AddProduct);
