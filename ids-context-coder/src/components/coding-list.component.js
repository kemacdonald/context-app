import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';


export default class CreateCodingList extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFilename = this.onChangeFilename.bind(this);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            filename: 'B-01_06_pass1_67_22.wav',
            code: '',
            users: [],
            context_codes: [
                { 'code': 'prohibition', 'keypress': 'p'}, 
                { 'code': 'bid for attention', 'keypress': 'b' },
                { 'code': 'comforting', 'keypress': 'c' },
                { 'code': 'approval', 'keypress': 'a' },
                { 'code': 'singing', 'keypress': 's' },
                { 'code': 'other', 'keypress': 'o' }
            ]
        }
    }

    componentDidMount() {
        let audio_file_url = 'http://localhost:5000/coding/get_audio_file?filename=' + this.state.filename
        
        this.setState({
            users: ['curt', 'kemacdonald'],
            username: 'kemacdonald',
            audio_file_url: audio_file_url,
            code: 'b'
        });

        
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeCode(e) {
        this.setState({
            code: e.target.value
        });
    }

    onChangeFilename(e) {
        this.setState({
            filename: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const coded_file = {
            username: this.state.username,
            filename: this.state.filename,
            code: this.state.code,
        };

        console.log(coded_file);

        window.location = '/';
    }

    render() {
        return (
            <div style={{ padding: 10 }}>
                <h3>Context Coding</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group" style={{ padding: 10 }}>
                        <h4>Current user: </h4>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div style={{ padding: 10 }}>
                        <h4>Current File is: {this.state.filename} </h4>
                    </div>
                    <div style={{ padding: 10 }}>
                        <p>Is this clip an instance of a :</p>
                        {this.state.context_codes.map(function (d, idx) {
                            return (<li key={idx}>{d.code} = {d.keypress}</li>)
                        })}
                    </div>

                    <ReactAudioPlayer
                        src={this.state.audio_file_url}
                        controls
                    />
                    
                    <div style={{ padding: 10 }}>
                        <h4>Current context code is: {this.state.code}</h4>
                    </div>

                    <div style={{ padding: 10 }}>
                        <input type="submit" value="Submit Context Code" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}