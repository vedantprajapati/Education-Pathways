import React, { Component } from "react";
import "./css/syllabus-upload-view.css";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default class ViewUploadSyllabus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.downloadSyllabus = this.downloadSyllabus.bind(this);

    };

    handleChange(event) {
        this.setState({file: event.target.files[0]});
        event.preventDefault();
    }

    handleSubmit(event) {
        let formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('code', this.props.code);

        axios.post('https://group-10x-ep.herokuapp.com/course/syllabus', formData, { 
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

    downloadSyllabus(event){
        axios.get(`https://group-10x-ep.herokuapp.com/course/syllabus?code=${this.props.code}`,
            {responseType: 'blob'}
        )
        .then((res) => {
            console.log(res.data);
            // Code for file download source from here https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios
            const href = URL.createObjectURL(res.data);

            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', `Syllabus_${this.props.code}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
            
        })
        .catch(async function (error) {
            const message = JSON.parse(await error.response.data.text());
            console.log(error.response)
            console.log(message)
            
            alert(message['error']);
            event.preventDefault();
        });        
    }

    render () {
        return (
            <div>
                <div className="download-syllabus">
                    <button className="download-syllabus-button" onClick={this.downloadSyllabus}> Download </button>
                </div>
                <div className="upload-form">
                    <form enctype="multipart/form-data" onSubmit={this.handleSubmit}>
                        <input type="file" id="file" name="file" onChange={this.handleChange} className="file_select"/>
                        <input type="submit" value="Upload" className="file_upload"/>
                    </form>
                </div>
            </div>
        );
    }
}