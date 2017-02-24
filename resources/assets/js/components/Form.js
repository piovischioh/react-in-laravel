import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      number: '',
      content: '',
    }
  }

  handleChange = (e) => {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    })
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      name: '',
      email: '',
      number: '',
      content: '',
    })
  }

  render(){
    return(
      <form>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          name='email'
          placeholder='Email'
          value={this.state.email}
          onChange={this.handleChange}
        />
        <label htmlFor='number'>Number</label>
        <input
          type='text'
          name='number'
          placeholder='Number'
          value={this.state.number}
          onChange={this.handleChange}
        />
        <label htmlFor='content'>Content</label>
        <textarea
          name='content'
          cols='30'
          rows='10'
          placeholder='Content'
          value={this.state.content}
          onChange={this.handleChange}
        />
        <button type='submit' onClick={this.handleClick}>Add</button>
      </form>
    )
  }
}

export default Form;
