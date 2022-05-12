import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {searchProduct} from "../store";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: [],
    };
  }

	componentDidUpdate(prevState) {

	}

  render() {
		const { search } = this.state
		const { searched } = this.props

    return (
			<>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { width: "20ch" },
        }}
        noValidate
        autoComplete="on"
      >
        <TextField
					name='search'
          size="small"
          autoFocus
          placeholder="Type to search..."
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            disableUnderline: true,
            style: { fontFamily: "unica one", color: "#6b5049" },
          }}
					value={search}
          onChange={ev => this.setState({search: ev.target.value})}
          onKeyDown={(e) => {
            if (e.key !== "Escape") {
              e.stopPropagation();
            }
          }}
        />
      </Box>
		</>
    );
  }
}

const mapState = ({products}) => {
	return (
		products
	)
}

const  mapDispatch =(dispatch) => {
	return {
		searched: (products) => {
			dispatch(searchProduct(products))	
	}
}
}

export default connect(mapState, mapDispatch)(Search);
