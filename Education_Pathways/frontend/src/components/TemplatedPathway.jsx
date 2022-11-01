import React, { Component } from "react";
import axios from "axios";
import Result from "./Results";
import "./css/Result.css";
import Label from "./Label";
import "./css/styles.css";

class TemplatedPathway extends Component {
    constructor() {
        super();
        this.state = {
            input: "",
            results: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    getData = (state) => {
        axios
            .get(
                `https://assignment-1-starter-template.herokuapp.com/templated_pathways?title=${this.state.input}`
            )
            .then((res) => {
                console.log(this.state.input);
                console.log(`it is ${res.status}`);
                console.log(res.data)
                console.log(res.data.length)
                console.log(res.data.title)
                console.log(res.data.TemplatedPathway)
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

    render() {
        return (
            <div className="SearchQuery">
                <div style={{ marginTop: "10%" }}>
                    <div class="container">
                        <h1> Templated Pathways</h1>
                        <h4>Templated Pathways provides a way to visualize anonymously curated course lists that users may have taken in the past. You can see the top pathways below as well as search or add templated pathways</h4>
                    </div>
                    <br></br>
                    <form onSubmit={this.handleSubmit} className={"search"}>
                        <div>
                            <input
                                placeholder={"Search for Pathway Name, Course Code, or Course Name"}
                                className={"text-input"}
                                type="text"
                                name="input"
                                value={this.state.input}
                                onChange={this.handleChange}
                            />
                            <input type="submit" value="Search" className={"submit-button"} />
                        </div>
                    </form>
                </div>
                {/* <div className={"search-result-display"}>{this.state.results}</div> */}
            </div>
        );
    }
}

export default TemplatedPathway;
