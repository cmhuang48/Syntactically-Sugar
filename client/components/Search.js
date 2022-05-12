import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {searchProduct} from "../store";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };

  }

	componentDidUpdate(prevProps) {
		if(this.prevProps && this.props.products){
				let result = this.state
				let product = this.props.products.filter(ele => ele.name === result)

			this.setState(this.props.history.push({ pathname: `/products/${product.id}` }))
		}
	}

  render() {
		const { search } = this.state
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
          //onKeyDown={(e) => {
          //  if (e.key !== "Escape") {
          //    e.stopPropagation();
          //  }
          //}}
        />
      </Box>
		</>
    );
  }
}

const mapState = ({products}, {match}) => {
console.log(match)
	return {
		products
	}
}

const  mapDispatch =(dispatch) => {
	return {
		searched: ({search}) => {
			dispatch(searchProduct({type: 'SEARCH_PRODUCT', search }))	
	}
}
}

export default connect(mapState, mapDispatch)(Search);
