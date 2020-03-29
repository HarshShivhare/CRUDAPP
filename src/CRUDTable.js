import "date-fns";
import React from "react";
import { connect } from "react-redux";
import {
  Button,
  TableCell,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
  Table,
  Paper,
  InputAdornment,
  Input
} from "@material-ui/core";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { fetchData, deleteproduct } from "./action";
import ProductModal from "./AddProduct";
import "./styles.css";

class CrudTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modalName: "",
      rowData: {},
      index: 0,
      serachParam: "",
      sortParam: ""
    };
  }

  componentWillMount() {
    fetch("./mockData.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.props.fetchData(data);
      })
      .catch(err => {
        console.log("Error occured while fetching data", err);
      });
  }

  handleSearch = event => {
    this.setState({
      serachParam: event.target.value,
      sortParam: ""
    });
  };

  handlerSort = event => {
    this.setState({
      sortParam: event.target.value,
      serachParam: ""
    });
  };

  modalHandler = (name, rowData, index) => {
    if (name === "delete") {
      this.props.deleteproduct(index);
    } else {
      this.setState({
        open: !this.state.open,
        modalName: name,
        rowData: Object.assign({}, rowData, { flag: true }),
        index
      });
    }
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
        <TableCell align="center" key={index}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disabled={false}
              disableToolbar
              disabled
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id={ele + "_" + index}
              value={row[ele]}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </TableCell>
      );
    });
  };

  renderTable = data => {
    return (
      data &&
      data.map((row, index) => {
        return (
          <TableRow key={index} id={index}>
            <TableCell component="th" scope="row" colSpan={2}>
              {row.product_name}
            </TableCell>
            <TableCell align="center" colSpan={2}>
              {row.product_description}
            </TableCell>
            <TableCell align="center">{row.is_active ? "✔" : "X"}</TableCell>
            <TableCell align="center">{row.price}<span>$</span></TableCell>
            <TableCell align="center">{row.offer_price}<span>$</span></TableCell>
            {this.renderDatePicker(row)}
            <TableCell>
              <Button
                id={index}
                variant="contained"
                color="primary"
                onClick={() => this.modalHandler("editProduct", row, index)}
              >
                Edit
              </Button>
            </TableCell>
            <TableCell>
              <Button
                id={index}
                variant="contained"
                color="secondary"
                onClick={() => this.modalHandler("delete", null, index)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        );
      })
    );
  };

  render() {
    let tableData = {};
    if (this.state.serachParam.length) {
      tableData = this.props.data.filter(ele => {
        if (ele.product_name.toLowerCase().includes(this.state.serachParam)) {
          return ele;
        }
      });
    } else if (this.state.sortParam) {
      let para = this.state.sortParam;
      tableData = this.props.data.sort(function(a, b) {
        let nameA = a[para].toLowerCase();
        let nameB = b[para].toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else {
      tableData = this.props.data;
    }
    return (
      <React.Fragment>
        <Table>
          <TableRow>
            <TableCell>
              <Input
                id="standard-adornment-weight"
                label="Offer Price"
                placeholder="Search Product"
                value={this.state.serachParam}
                onChange={this.handleSearch}
                endAdornment={
                  <InputAdornment position="end">
                    <SearchSharpIcon />
                  </InputAdornment>
                }
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  "aria-label": "weight"
                }}
              />
            </TableCell>
            <TableCell>
              <lable>Sort By </lable>
              <select className="dropdown" onChange={this.handlerSort}>
                <option value="product_name" onChange={this.onClickHandler}>
                  Name
                </option>
                <option value="price" onChange={this.onClickHandler}>
                  Price
                </option>
                <option value="offer_price" onChange={this.onClickHandler}>
                  Offer Price
                </option>
              </select>
            </TableCell>
            <TableCell align="right">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => this.modalHandler("addProduct")}
              >
                Add Product
              </Button>
              <ProductModal
                open={this.state.open}
                modalHandler={this.modalHandler}
                data={this.state}
              />
            </TableCell>
          </TableRow>
        </Table>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow key={1}>
                <TableCell colSpan={2}>Name</TableCell>
                <TableCell align="center" colSpan={2}>Description</TableCell>
                <TableCell align="center">Active</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Offer Price</TableCell>
                <TableCell align="center">Start At</TableCell>
                <TableCell align="center">End At</TableCell>
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center">Updated At</TableCell>
                <TableCell align="center" colSpan={2}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.renderTable(tableData)}</TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data
  };
}
const mapDispatchToProps = {
  fetchData,
  deleteproduct
};

export default connect(mapStateToProps, mapDispatchToProps)(CrudTable);
