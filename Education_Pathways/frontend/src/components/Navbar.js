import React, { Component, useState, useEffect} from "react";
import "./css/navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./img/logo.png";
import { Navbar, Nav } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useLocation,
} from "react-router-dom";
import TemplatedPathway from "./TemplatedPathway";
// import LogIn from "./LogIn.jsx";
import CourseDescriptionPage from "./CourseDescription";
// import Wishlist from './Wishlist';
// import SignUp from './SignUp'
import SearchResultDisplay from "./ResultDisplay";
import TopTemplatedPathway from "./TopTemplatedPathways";
import Modal from "react-bootstrap/Modal";




function CourseDescription(props) {
  let query = useQuery();
  return <CourseDescriptionPage code={query.get("code")} />;
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default class NavbarComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username"),
      login: false,
      modalOpen: false,
      currentColor: "blue",
    };
  }

  componentDidMount() {
    if (localStorage.getItem("username") !== "") {
      this.setState({ username: localStorage.getItem("username") });
    }
  }

  logOut = () => {
    localStorage.setItem("username", "");
    this.setState({ username: "" });
  }

  openModal = () => {
    this.setState({modalOpen: true});
  }
  
  closeModal = () => {
    this.setState({modalOpen: false});
  }

  changeColor = (e, newColor) => {
    e.preventDefault();
    this.setState({currentColor: newColor});
    let backgroundColor = "#1c3e6f";
    let textColor = "gray";

    if (newColor === "gray") {
      backgroundColor = "gray";
      textColor = "black";
    }

    if (newColor === "pink") {
      backgroundColor = "pink";
      textColor = "gray";
    }

    if (newColor === "red") {
      backgroundColor = "#ff9999";
      textColor = "black";
    }

    if (newColor === "green") {
      backgroundColor = "#99ff99";
      textColor = "black";
    }

    var ele = document.getElementsByClassName("navbar");
    for (let i = 0; i < ele.length; i++) {
      ele[i].style.backgroundColor = backgroundColor;
    }

    var ele = document.getElementsByClassName("submit-button");
    for (let i = 0; i < ele.length; i++) {
      ele[i].style.backgroundColor = backgroundColor;
    }

    var all = document.getElementsByTagName("*");
    for (let i = 0; i < all.length; i++) {
      all[i].style.color = textColor;
    }

    var links = document.getElementsByClassName("search-result-item");
    for (let i = 0; i < links.length; i++) {
      links[i].style.color = "#0d6efd";
    }
    document.getElementById("modalHeading").style.backgroundColor = backgroundColor;
    document.getElementById("modalText").style.color = backgroundColor;
  }

  render() {
    return (

      <>
      <Router>
        <div>
          <Navbar bg="myBlue" variant="dark" sticky="top" expand="lg">
            <Navbar.Brand>
              <img src={logo} alt="" />{" "}
              <Nav.Link href="/" style={{ color: "white", display: "inline" }}>
                Education Pathways
              </Nav.Link>
            </Navbar.Brand>

            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav>
                <Nav.Link as={Link} to="/about">
                  About Us
                </Nav.Link>
                <Nav.Link as={Link} to="/templated_pathways">
                  Templated Pathways
                </Nav.Link>
                {/* <Nav.Link href="/search" style={{ color: "white", display: "inline" }}>
                  Search
                </Nav.Link> */}
                
                <button onClick={this.openModal} class="themeButton">Customize Theme</button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          <Switch>
            <Route path="/about">
              <div className="body_text">
                <p>
                  Welcome to CARTE's in-development tool for course selection at
                  UofT. Education Pathways allows for more intelligent course
                  searching, by matching not just the terms you search, but ones
                  relevant to them. The more terms you search for, the more
                  relevant your results will be! Even try searching across
                  disciplines for the courses that best cover each. Whatever
                  year you are looking for, Education Pathways will also suggest
                  courses in earlier years that will best help you to prepare.
                  To get the most out of this, try searching for courses in a
                  later year and see what is suggested for your current one. We
                  are looking for feedback to improve Education Pathways and
                  make it more useful for students. If you have ideas or
                  suggestions, please{" "}
                  <a href="mailto:alex.olson@utoronto.ca"> email us! </a>{" "}
                  <br></br>
                </p>
                <p>
                  <b>Development Team: </b>
                </p>
                <p>
                  Alexander Olson{" "}
                  <a href="https://carte.utoronto.ca/"> (CARTE)</a>{" "}
                </p>
                <p>
                  Student team from{" "}
                  <a href="https://shuiblue.github.io/UofT-ECE444/">
                    ECE444-Fall2021
                  </a>{" "}
                  : Janelle Cuevas, Jean Lin, Terry Luan, Cansin Varol, Nick Woo
                </p>
              </div>
              {/* <SearchResultDisplay /> */}
            </Route>
            <Route path="/search">
              <SearchResultDisplay />
            </Route>
            <Route
              exact
              path="/courseDetails/:code"
              render={(props) => <CourseDescriptionPage {...props} />}
            ></Route>
            <Route path="/templated_pathways" onClick={event => this.changeColor(event, this.state.currentColor)}>
              <TemplatedPathway/>
              <TopTemplatedPathway/>
            </Route>
            <Route path="/">
              <SearchResultDisplay />
            </Route>
          </Switch>
        </div>
      </Router>
      <div>
      <Modal show={this.state.modalOpen} onHide={this.closeModal}>
            <Modal.Header closeButton id="modalHeading">
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="modalText">Themes: </div>
                <br />
                <div> 
                  <span onClick={event => this.changeColor(event, "#1c3e6f")} class="dot" id="blue"></span> 
                  <span onClick={event => this.changeColor(event, "gray")} class="dot" id="black"> </span> 
                  <span onClick={event => this.changeColor(event, "pink")} class="dot" id="pink"> </span>
                  <span onClick={event => this.changeColor(event, "red")} class="dot" id="red"> </span>
                  <span onClick={event => this.changeColor(event, "green")} class="dot" id="green"> </span>
                </div>
            </Modal.Body>
          </Modal>
      </div>
      </>
    );
  }
}
