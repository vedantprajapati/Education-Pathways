import React, { Component } from "react";
import axios from "axios";
import Result from "./Results";
import "./css/Result.css";
import Label from "./Label";
import "./css/styles.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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

    redirectCourse = (course) => {
        this.props.history.push(`/course/details/${course}`, {
          course_code: course,
        });
      };

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
        if (this.state.input === "" || this.state.input === null){
            this.setState({ results: [] });
        }
        else{
            axios
            .get(
                `http://localhost:5000/templated_pathways?title=${this.state.input}`
            )
            .then((res) => {
                
                if (res.status === 200) {
                    this.setState({ results: [] });

                    if (res.data.templated_pathway) {
                        
                        let len = res.data.templated_pathway.pathway.length;
                        let result_temp = [];
                        result_temp.push(<h2>Pathway Name: {res.data.templated_pathway.title}</h2>);
                        result_temp.push(<p>{res.data.templated_pathway.comments}</p>);
                        result_temp.push(<p> Tip: Click on course code to go to course detail page</p>);
                        this.setState({ results: result_temp });
                        console.log(this.state.result_temp)
                        console.log(this.state.results)
                        for (let i = 0; i < len; i++) {
                            result_temp.push(
                                <Container>        
                                    <a
                                        href={`courseDetails/${res.data.templated_pathway.pathway[i]}`}
                                        className={"search-result-item"}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Row className={"result-display"}>
                                            
                                        <Col>
                                            <h5>{res.data.templated_pathway.pathway[i]}</h5>
                                        </Col>
                                        </Row>
                                    </a>
                                </Container>
                            );
                        }
                        this.setState({ results: result_temp });
                        console.log(this.state.result_temp)
                        console.log(this.state.results)
                    } else if (res.data.length === 0) {

                        alert("Course not found");
                    }
                } else if (res.status === 400) {
                    alert("System Error. Please refresh");
                }
            });
        }

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
                <div className={"search-result-display"}>{this.state.results}</div>
            </div>
        );
    }
}

export default TemplatedPathway;
