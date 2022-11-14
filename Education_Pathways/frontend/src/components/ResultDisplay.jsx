import React, { Component } from "react";
import axios from "axios";
import Result from "./Results";
import "./css/Result.css";
import Label from "./Label";
import "./css/styles.css";

class SearchResultDisplay extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      faculty: "all",
      courseLevel: "all",
      results: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getData(this.state);
  }

  // handle random button click action and get data from backend api, and pick one result randomly
  handleRandom(event) {
    event.preventDefault();
    this.getRandomData(this.state);
  }

  getData = (state) => {
    axios
      .get(
          `http://localhost:5000/searchc?input=${state.input}&faculty=${state.faculty}&courseLevel=${state.courseLevel}`
        )
      .then((res) => {
        console.log(`it is ${res.status}`);
        if (res.status === 200) {
          this.setState({ results: [] });

          if (res.data.length > 0) {

            let len = res.data.length;
            let result_temp = [];
            result_temp.push(<h>Tips: Click on course code to go to course detail page</h>);
            result_temp.push(<Label></Label>);

            for (let i = 0; i < len; i++) {
              result_temp.push(
                <Result
                  course_code={res.data[i].code}
                  course_name={res.data[i].name}
                ></Result>
              );
            }
            this.setState({ results: result_temp });
          } else if (res.data.length === 0) {

            alert("Course not found");
          } else {
            let result_temp = [];
            result_temp.push(<h>Tips: Click on course code to go to course detail page</h>);
            result_temp.push(<Label></Label>);
            result_temp.push(
              <Result
                course_code={res.data.course.code}
                course_name={res.data.course.name}
              ></Result>
            );
            this.setState({ results: result_temp });

          }
        } else if (res.status === 400) {
          alert("System Error. Please refresh");
        }
      });
  };

  getRandomData = (state) => {
      axios
        .get(`http://localhost:5000/searchc?input=${state.input}&faculty=${state.faculty}&courseLevel=${state.courseLevel}`
        )
      .then((res) => {
        console.log(`it is ${res.status}`);
        if (res.status === 200) {
          this.setState({ results: [] });

          if (res.data.length > 0) {

            let len = res.data.length;
            let result_temp = [];
            result_temp.push(<h>Tips: Click on course code to go to course detail page</h>);
            result_temp.push(<Label></Label>);
            let randomResult = res.data[Math.floor(Math.random() * res.data.length)];
              result_temp.push(
                <Result
                  course_code={randomResult.code}
                  course_name={randomResult.name}
                ></Result>
              );

            this.setState({ results: result_temp });
          } else if (res.data.length === 0) {

            alert("Course not found");
          } else {
            let result_temp = [];
            result_temp.push(<h>Tips: Click on course code to go to course detail page</h>);
            result_temp.push(<Label></Label>);
            result_temp.push(
              <Result
                course_code={res.data.course.code}
                course_name={res.data.course.name}
              ></Result>
            );
            this.setState({ results: result_temp });

          }
        } else if (res.status === 400) {
          alert("System Error. Please refresh");
        }
      });
  }

  render() {
    return (
      <div className="SearchQuery">
        <div style={{ marginTop: "10%" }}>
          <h1> Education Pathways</h1>
          <br></br>
          {/* <div className = "body_text">
      Welcome to CARTE's in-development tool for course selection at UofT. Education Pathways allows for more intelligent course searching, by matching not just the terms you search, but ones relevant to them. The more terms you search for, the more relevant your results will be! Even try searching across disciplines for the courses that best cover each.

Whatever year you are looking for, Education Pathways will also suggest courses in earlier years that will best help you to prepare. To get the most out of this, try searching for courses in a later year and see what is suggested for your current one.

We are looking for feedback to improve Education Pathways and make it more useful for students. If you have ideas or suggestions, please <a href = "mailto:alex.olson@utoronto.ca">  email us! </a>


      </div> */}
          <form onSubmit={this.handleSubmit} className={"search"}>
            <div>
              <input
                placeholder={"Search for course code, course name, keyword ..."}
                className={"text-input"}
                type="text"
                name="input"
                value={this.state.input}
                onChange={this.handleChange}
              />
              <input type="submit" value="Search" className={"submit-button"} onClick={this.handleSubmit}/>
              <input type="submit" value="Random" className={"submit-button"} onClick={this.handleRandom}/> 
            </div>
            <div className={"advanced-search-options"}>
              <br></br>
              <div>
                <label for="faculties">Faculty:</label>
                <select name="faculty" id="faculties" className={"select"} onChange={this.handleChange}>
                  <option value="all">All</option>
                  <option value="ECE">Electrical & Computer Engineering</option>
                  <option value="CHE">Chemical Engineering</option>
                  <option value="CIV">Civil Engineering</option>
                  <option value="MIE">Mechanical & Industrial Engineering</option>
                  <option value="MIN">Mineral Engineering</option>
                  <option value="MSE">Material Science Engineering</option>
                  <option value="ESC">Engineering Science</option>
                  <option value="artsci">Arts & Science</option>

                </select>
              </div>
              <div>
                <label for="courseLevels">Course Level:</label>
                <select name="courseLevel" id="courseLevels" className={"select"} onChange={this.handleChange}>
                  <option value="all">All</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div className={"search-result-display"}>{this.state.results}</div>
      </div>
    );
  }
}

export default SearchResultDisplay;
