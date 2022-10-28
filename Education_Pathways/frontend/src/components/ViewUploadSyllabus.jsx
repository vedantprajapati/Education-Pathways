import React, { Component } from "react";
import axios from "axios";

export default class ViewUploadSyllabus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    };

    handleChange(event) {
        this.setState({file: event.target.files[0]});
  }

    handleSubmit(event) {
        let formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('code', this.props.code);

        axios.post('http://localhost:3000/course/syllabus', formData, { 
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res.data);
            alert(res.data.message)
        })
        .catch(function (error) {
            console.log(error.response)
            alert(error.response.data.error);
        });
        event.preventDefault();
}

    render () {
        return (
            <form enctype="multipart/form-data" onSubmit={this.handleSubmit}>
                <input type="file" id="file" name="file" onChange={this.handleChange}/>
                <input type="submit" value="Upload" />
            </form>
        );
    }
}