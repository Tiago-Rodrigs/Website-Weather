import React, { Component } from "react";
import "./search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      suggestion: [],
    };
  }

  //this function closes the search seaction by changing the class name
  handleMenu = () => {
    let container = document.getElementById("container");
    let body = document.getElementsByTagName("body")[0];

    if (container.className === "search-container") {
      container.className = "slide-out";
      body.className = "";
      this.setState({search: "", suggestion:[]})
    } else {
      container.className = "search-container";
      body.className = "stop-scrolling";
    }
  };

  // This function will submit the search query from user
  handleSearch = (e, location) => {
    this.props.submitRequest({ params: { query: location } });
    this.handleMenu();
    this.setState({search: "", suggestion:[]})
    e.preventDefault();
  };
  // This function will retrive locations suggestions user
  handleSearchSuggestion = async (e) => {

    if (e.target.value.length === 0) {
      this.setState({ suggestion: []});
    }
    await this.props.handleSearchSuggestion({
      params: { query: this.state.search },
    });

    let body = document.getElementsByTagName("body")[0];

    body.className = "stop-scrolling";

    this.setState({ suggestion: this.props.suggestion });

    console.log(this.props.suggestion);

  };

  render() {
    return (
      <div className="hide" id="container">
        <i className="fa fa-times" onClick={this.handleMenu}></i>
        <form onSubmit={(e) => this.handleSearch(e, this.state.search)}>
          <i className="fa fa-search"></i>
          <input
            type="text"
            required
            value={this.state.search}
            placeholder="search location"
            onChange={async (e) => {
              await this.setState({ search: e.target.value });
              this.handleSearchSuggestion(e);
            }}
          />
          <button type="submit">Search</button>
        </form>

        {this.state.suggestion.map((item) => {
          return (
            <div
              className="search-suggestion"
              onClick={(e) => this.handleSearch(e, item.city)}
              key={item.woeid}
            >
              <li>{item.city}</li>

              <i className="fa-solid fa-angle-right"></i>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Search;
