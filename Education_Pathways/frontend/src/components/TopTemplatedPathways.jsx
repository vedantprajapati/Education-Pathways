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
        console.log("yooooo")
    }

    redirectCourse = (course) => {
        this.props.history.push(`/course/details/${course}`, {
            course_code: course,
        });
    };

    getData = (state) => {
        console.log('sheeesh')

        axios
            .get(
                `http://localhost:5000/top_templated_pathways`
            )
            .then((res) => {
                console.log('poggers')
                console.log(res.data.top_pathways)
                // console.log(`it is ${res.status}`);
                // console.log(res.data.top_pathways)
                // console.log(res.data.top_pathways[0])
                // // console.log(res.data.templated_pathway.comments)
                // // console.log(res.data.title);
                // // console.log(res.data.templated_pathway.length)

                if (res.status === 200) {
                    this.setState({ results: [] });
                    if (res.data.top_pathways) {

                        let len = res.data.top_pathways.length;
                        let result_temp = [];

                        this.setState({ results: result_temp });
                        result_temp.push(<h2>Top Pathways</h2>);
                        for (let i = 0; i < len; i++) {
                            result_temp.push(
                                <Container>
                                    <Row className={"result-display"}>

                                        <Col>
                                            <h5>{res.data.top_pathways[i].title}</h5>
                                        </Col>
                                        <Col>
                                            <h5>{res.data.top_pathways[i].comments}</h5>
                                        </Col>
                                        <Col>
                                            <ul>
                                                {res.data.top_pathways[i].pathway.map((course) => (<li>
                                                    <a
                                                        href={`courseDetails/${course}`}
                                                        className={"search-result-item"}
                                                        style={{ textDecoration: "none" }}
                                                    >
                                                        {course}
                                                    </a>

                                                </li>))}
                                            </ul>
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
            })
            .catch((err) => { console.log(err) });

    };

    componentDidMount() {
        console.log("I ran")
        this.getData(this.state);
        console.log(this.state.results)
    }


    render() {
        return (
            <div className={"search-result-display"}>{this.state.results}</div>
        );
    }
}

export default TopTemplatedPathway;
