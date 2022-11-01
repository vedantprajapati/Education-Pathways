import React, { Component } from "react";
import axios from "axios";
import Result from "./Results";
import "./css/Result.css";
import Label from "./Label";
import "./css/styles.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
class TopTemplatedPathway extends Component {
    constructor() {
        super();
        this.state = {
            input: "",
            results: [],
        };
        this.handleChange = this.handleChange.bind(this);
        
        this.getData(this.state)
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
        if (this.state.input === "" || this.state.input === null) {
            this.setState({ results: [] });
        }
        else {
            axios
                .get(
                    `http://localhost:5000/top_templated_pathways`
                )
                .catch((e) => {
                    console.log(e)
                })
                .then((res) => {
                    console.log(this.state.input);
                    // console.log(`it is ${res.status}`);
                    console.log(res.data.top_pathways)
                    console.log(res.data.top_pathways[0])
                    // console.log(res.data.templated_pathway.comments)
                    // console.log(res.data.title);
                    // console.log(res.data.templated_pathway.length)

                    if (res.status === 200) {
                        this.setState({ results: [] });

                        if (res.data.top_pathways) {

                            let len = res.data.top.length;
                            let result_temp = [];


                            this.setState({ results: result_temp });

                            for (let i = 0; i < len; i++) {
                                result_temp.push(
                                    <Container>
                                        {/* <a
                                        href={`courseDetails/${res.data.templated_pathway.pathway[i]}`}
                                        className={"search-result-item"}
                                        style={{ textDecoration: "none" }}
                                    > */}
                                        <Row className={"result-display"}>

                                            <Col>
                                                <h5>{res.data.templated_pathway[i].title}</h5>
                                            </Col>
                                            <Col>
                                                <h5>{res.data.templated_pathway.pathway.comments}</h5>
                                            </Col>
                                            <Col>
                                                <h5>
                                                    {res.data.templated_pathway.pathway}
                                                </h5>
                                            </Col>
                                        </Row>
                                        {/* </a> */}
                                    </Container>
                                );
                            }
                            this.setState({ results: result_temp });
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
            <div className={"search-result-display"}>{this.state.results}</div>
        );
    }
}

export default TopTemplatedPathway;
