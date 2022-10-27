import React, { Component } from "react";
import "./css/course-description.css";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./css/AddPathway.css";
import requisite_label from "./img/requisite-label.png";
import empty_star from "./img/star.png";
import starred from "./img/starred.png";
import axios from "axios";
import { Form } from "react-bootstrap";
import { alignPropType } from "react-bootstrap/esm/types";

class AddPathwayPage extends Component {
    constructor(props) {
        super(props);

        this.state = {                                          //24 courses set to cover 2 year full workload for F/S term
            title: "",
            pathway: [],
            course1: "",
            course2: "",
            course3: "",
            course4: "",
            course5: "",
            course6: "",
            course7: "",
            course8: "",
            course9: "",
            course10: "",
            course11: "",
            course12: "",
            course13: "",
            course14: "",
            course15: "",
            course16: "",
            course17: "",
            course18: "",
            course19: "",
            course20: "",
            course21: "",
            course22: "",
            course23: "",
            course24: "",
            comments: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        alert("A submission is made");
                                                //temperoraly set 24 courses, subject to change
            this.state.pathway.push(this.state.course1.value);
            this.state.pathway.push(this.state.course2.value);
            this.state.pathway.push(this.state.course3.value);
            this.state.pathway.push(this.state.course4.value);
            this.state.pathway.push(this.state.course5.value);
            this.state.pathway.push(this.state.course6.value);
            this.state.pathway.push(this.state.course7.value);
            this.state.pathway.push(this.state.course8.value);
            this.state.pathway.push(this.state.course9.value);
            this.state.pathway.push(this.state.course10.value);
            this.state.pathway.push(this.state.course11.value);
            this.state.pathway.push(this.state.course12.value);
            this.state.pathway.push(this.state.course13.value);
            this.state.pathway.push(this.state.course14.value);
            this.state.pathway.push(this.state.course15.value);
            this.state.pathway.push(this.state.course16.value);
            this.state.pathway.push(this.state.course17.value);
            this.state.pathway.push(this.state.course18.value);
            this.state.pathway.push(this.state.course19.value);
            this.state.pathway.push(this.state.course20.value);
            this.state.pathway.push(this.state.course21.value);
            this.state.pathway.push(this.state.course22.value);
            this.state.pathway.push(this.state.course23.value);
            this.state.pathway.push(this.state.course24.value);
    }

    

    render() {
        return (
            <div className="page-content">
                <Container className="pathway-form">
                    <Row float="center" className="form-title">
                        <Col>
                            <h1 style={{marginTop:"30px"}}>Add New Pathway</h1>
                        </Col>
                    </Row>
                        <form className="form" onSubmit={this.handleSubmit} style={{textAlign:"center" ,borderRadius: "15px", border: "2px solid #c4c4c4"}}>
                            <div>Pathway Title<input type={"text"} ref="title" placeholder="Pathway Title" style={{width:"600px", borderRadius: "5px", border: "2px solid #c4c4c4"}} /></div>
                            <div>
                                Y3 H1
                                <input name="course1" type={"text"} ref="course1" placeholder="course1" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course2" type={"text"} ref="course2" placeholder="course2" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course3" type={"text"} ref="course3" placeholder="course3" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course4" type={"text"} ref="course4" placeholder="course4" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course5" type={"text"} ref="course5" placeholder="course5" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course6" type={"text"} ref="course6" placeholder="course6" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                            </div><div>
                                Y3 H2
                                <input nameref="course7"  type={"text"} ref="course7" placeholder="course7" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input nameref="course8"  type={"text"} ref="course8" placeholder="course8" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input nameref="course9"  type={"text"} ref="course9" placeholder="course9" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input nameref="course10" type={"text"} ref="course10" placeholder="course10" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input nameref="course11" type={"text"} ref="course11" placeholder="course11" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input nameref="course12" type={"text"} ref="course12" placeholder="course12" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                            </div>
                            <div>
                                Y4 H1
                                <input name="course13" type={"text"} ref="course13" placeholder="course13" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course14" type={"text"} ref="course14" placeholder="course14" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course15" type={"text"} ref="course15" placeholder="course15" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course16" type={"text"} ref="course16" placeholder="course16" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course17" type={"text"} ref="course17" placeholder="course17" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course18" type={"text"} ref="course18" placeholder="course18" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                            </div>
                            <div>
                                Y4 H2
                                <input name="course19" type={"text"} ref="course19" placeholder="course19" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course20" type={"text"} ref="course20" placeholder="course20" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course21" type={"text"} ref="course21" placeholder="course21" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course22" type={"text"} ref="course22" placeholder="course22" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course23" type={"text"} ref="course23" placeholder="course23" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course24" type={"text"} ref="course24" placeholder="course24" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                            </div>
                            <div>Comments<input type={"text"} ref="comment" placeholder="comments" style={{width:"600px", borderRadius: "5px", border: "2px solid #c4c4c4"}} /></div>
                            <br></br>
                            <button type="submit">Submit</button>
                        </form>
                </Container>
            </div>
        )
    }
}

export default AddPathwayPage