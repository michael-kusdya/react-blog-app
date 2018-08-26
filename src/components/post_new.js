import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from '../actions'

class PostNew extends Component {

    renderField(field){
        console.log(field)
        const className = field.meta.touched && field.meta.error ? 'form-group has-danger' : 'form-group';
        
        return(
            <div className={className}>
                <label>{field.label}</label>
                <input type='text' className='form-control'
                    {...field.input}
                />
                {field.meta.touched ? field.meta.error : ''}
            </div>
        )
    }

    onSubmit(values){
        // console.log(values);
        this.props.createPost(values, () => {
            this.props.history.push('/');
        })
    }

    render() {
        const handleSubmit = this.props.handleSubmit; /* handleSubmit bawaan dari reduxForm */
        console.log('handle', handleSubmit);
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}> /* handleSubmit handle redux side(validation dll), onSubmit handle our side (action creator)*/
                <Field 
                    label='Title'
                    name='title'
                    component={this.renderField}
                />
                <Field
                    label='Categories' 
                    name='categories'
                    component={this.renderField}
                />
                <Field 
                    label='Content'
                    name='content'
                    component={this.renderField}
                />
                <button type='submit' className='btn btn-primary'>Submit</button>
                <Link to='/' className='btn btn-danger'>Cancel</Link>
            </form>
        )
    }

}

function validate(values){
    const errors = {}; /* values = hasil inputan user dalam bentuk object */

    if(!values.title){
        errors.title = 'enter a title'
    }
    if(!values.categories){
        errors.categories = 'enter a category'
    }
    if(!values.content){
        errors.content = 'enter a title'
    }

    return errors
}

export default reduxForm({
    validate: validate,
    form: 'CreateNewPost'
})(
    connect(null, { createPost })(PostNew)
)