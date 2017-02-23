import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick  = this.handleClick.bind(this);
  }
  handleChange() {
    this.props.onInput(
      this.refs.nameInput.value,
      this.refs.emailInput.value,
      this.refs.numberInput.value,
      this.refs.contentInput.value
    )
  }
  handleClick(e) {
    e.preventDefault();
    this.props.onSubmit()
  }
  render(){
    return(
      <form>
        <h1 className='warn'></h1>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' placeholder='Name' ref='nameInput' onChange={this.handleChange}/>
        <label htmlFor='email'>Email</label>
        <input type='text' name='email' placeholder='Email' ref='emailInput' onChange={this.handleChange}/>
        <label htmlFor='number'>Number</label>
        <input type='text' name='number' placeholder='Number' ref='numberInput' onChange={this.handleChange}/>
        <label htmlFor='content'>Content</label>
        <textarea name='content' cols='30' rows='10' placeholder='Content' ref='contentInput' onChange={this.handleChange}/>
        <button type='submit' onClick={this.handleClick}>Add</button>
      </form>
    )
  }
}

export default Form;
