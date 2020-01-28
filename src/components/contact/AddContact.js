import React, {Component} from 'react';
import {Consumer} from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from 'axios';

class AddContact extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    };

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const {name, email, phone} = this.state;
        const newContact = {
            name,
            email,
            phone
        };

        // Check for Errors
        if (name === '') {
            this.setState({errors: {name: 'Name is required'}});
            return;
        }

        if (email === '') {
            this.setState({errors: {email: 'Email is required'}});
            return;
        }

        if (phone === '') {
            this.setState({errors: {phone: 'Phone is required'}});
            return;
        }

        const res = await axios.post('http://jsonplaceholder.typicode.com/users', newContact);
        dispatch({type: 'ADD_CONTACT', payload: res.data});

        // Clear input fields
        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        });

        this.props.history.push('/');
    };

    render() {
        const {name, email, phone, errors} = this.state;
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return (
                        <div className="card mb-3">
                            <div className="card-header">Add Contact</div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                    <TextInputGroup
                                        lable="Name"
                                        name="name"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={this.onChange}
                                        error={errors.name}
                                    />
                                    <TextInputGroup
                                        lable="Email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={this.onChange}
                                        error={errors.email}
                                    />
                                    <TextInputGroup
                                        lable="Phone"
                                        name="phone"
                                        placeholder="Enter phone"
                                        value={phone}
                                        onChange={this.onChange}
                                        error={errors.phone}
                                    />
                                    <input type="submit"
                                           value="Add Contact"
                                           className="btn btn-light btn-block"/>
                                </form>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default AddContact;