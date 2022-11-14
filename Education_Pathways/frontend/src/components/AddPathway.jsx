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
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSave(event){
        event.preventDefault();
        var joined = [];
        var i;
        // this.state.pathway.concat(this.state.course1, this.state.course2, this.state.course3, this.state.course4, this.state.course5, this.state.course6, this.state.course7, this.state.course8, this.state.course9, this.state.course10, this.state.course11, this.state.course12, this.state.course13, this.state.course14, this.state.course15, this.state.course16, this.state.course17, this.state.course18, this.state.course19, this.state.course20, this.state.course21, this.state.course22, this.state.course23, this.state.course24);
        for(i=1; i<=24; i++){
            if(this.state["course"+i] != ""){
                joined.push(this.state["course"+i]);
            }
        }
        this.setState({pathway: joined});
    }

    //push all courses into pathway array and post to backend
    handleSubmit(event){
        event.preventDefault();
        var joined = [];
        var i;
        for(i=0; i<this.state.pathway.length; i++){
            if(this.state["course"+i] != ""){
                joined.push(this.state["course"+i]);
            }
        }
        this.setState({pathway: joined});
        this.postData(this.state);
        this.setState({pathway: []});
    }

    postData = () => {
        // axios.post("http://localhost:5000/templatedpathways/templatedpathwaydao", {
        //     title: this.state.title,
        //     pathway: this.state.pathway,
        //     comments: this.state.comments
        // })
        let payload = {
            title: this.state.title,
            pathway: this.state.pathway,
            comments: this.state.comments
        }
        // axios("http://localhost:5000/templatedpathways/templatedpathwaydao",
        //     {
        //         method: "POST", 
        //         headers: {"Content-Type": "application/json"},
        //         data: JSON.stringify(payload)})
        // .then(res => {
        //     console.log(res);
        //     console.log(res.data);
        // })
        // .catch(error => {
        //     console.log('response: ', error.response.data);
        //   });

        // let formData = new FormData();
        // formData.append('title', this.state.title);
        // formData.append('pathway', this.state.pathway);
        // formData.append('comments', this.state.comments);

        // axios.post('http://localhost:5000/templatedpathways/templatedpathwaydao', formData, { 
        //     headers: {'Content-Type': 'multipart/form-data'}
        // })
        // .then((res) => {
        //     console.log(res.data);
        //     alert(res.data.message)
        // })
        // .catch(function (error) {
        //     console.log(error.response)
        //     alert(error.response.data.error);
        // });

        fetch("http://localhost:5000/templated_pathways", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }
        // .then(res => {res.json()})
        // .then(data => { console.log(data) })
        // .catch(error => { console.log(error) })
        )
    
    }


    render() {
        return (
            <div className="page-content">
                <Container className="pathway-form">
                    <Row float="center" className="form-title">
                        <Col>
                            <h1 style={{marginTop:"30px"}}>Add New Pathway</h1>
                        </Col>
                        <h5>Please Save your work before submit!</h5>
                    </Row>
                        <form className="form" onSubmit={this.handleSubmit} onChange={this.handleChange} style={{textAlign:"center" ,borderRadius: "15px", border: "2px solid #c4c4c4"}}>
                            <div>Pathway Title<input name="title" type={"text"} ref="title" placeholder="Pathway Title" style={{width:"600px", borderRadius: "5px", border: "2px solid #c4c4c4"}} /></div>
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
                                <input name="course7"  type={"text"} ref="course7" placeholder="course7" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course8"  type={"text"} ref="course8" placeholder="course8" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course9"  type={"text"} ref="course9" placeholder="course9" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course10" type={"text"} ref="course10" placeholder="course10" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course11" type={"text"} ref="course11" placeholder="course11" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
                                <input name="course12" type={"text"} ref="course12" placeholder="course12" style={{width:"100px", margin:"5px", borderRadius: "5px", border: "2px solid #c4c4c4"}}/>
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
                            <div>Comments<input name="comments" type={"text"} ref="comments" placeholder="comments" style={{width:"600px", borderRadius: "5px", border: "2px solid #c4c4c4"}} /></div>
                            <br></br>
                            <button type="save" onClick={this.handleSave} class="submit-button">Save</button>
                            <button type="submit" onClick={this.handleSubmit} class="submit-button">Submit</button>
                        </form>
                </Container>
            </div>
        )
    }
}

export default AddPathwayPage