import React from 'react';
import ReactDOM from 'react-dom';

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
    }
});

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick          = this.handleClick.bind(this);
    this.handleToEdit         = this.handleToEdit.bind(this);
    this.handleEdit           = this.handleEdit.bind(this);
    this.handleNameChange     = this.handleNameChange.bind(this);
    this.handleEmailChange    = this.handleEmailChange.bind(this);
    this.handleNumberChange   = this.handleNumberChange.bind(this);
    this.handleContentChange  = this.handleContentChange.bind(this);
    this.state = {
      name: '',
      email: '',
      number: '',
      content: ''
    };
  }
  handleClick(id) {
    this.props.onDel(id);
  }
  handleToEdit(id) {
    this.props.onToEdit(id);
  }
  handleEdit(id) {
    this.props.onEdit(
      id,
      this.state.name=='' ? undefined : this.state.name,
      this.state.email=='' ? undefined : this.state.email,
      this.state.number=='' ? undefined : this.state.number,
      this.state.content=='' ? undefined : this.state.content
    );
    this.setState({
      name: '',
      email: '',
      number: '',
      content: ''
    })
  }
  handleNameChange(e){
    this.setState({
      name: e.target.value
    })
  }
  handleEmailChange(e){
    this.setState({
      email: e.target.value
    })
  }
  handleNumberChange(e){
    this.setState({
      number: e.target.value
    })
  }
  handleContentChange(e){
    this.setState({
      content: e.target.value
    })
  }
  render(){
    var rows = [];
    if (this.props.data.length) {
      this.props.data.forEach(content => {
        if (content.edit) {
          rows.push(
            <tr key={content.id}>
            <td>{content.name}</td>
            <td>{content.email}</td>
            <td>{content.number}</td>
            <td>{content.content}</td>
            <td className='edit' onClick={this.handleToEdit.bind(null, content.id)}>edit</td>
            <td className='del'  onClick={this.handleClick.bind(null, content.id)}>x</td>
            </tr>
          )
        }else {
          rows.push(
            <tr key={content.id}>
            <td><input type='text' placeholder={content.name} onChange={this.handleNameChange}/></td>
            <td><input type='text' placeholder={content.email} onChange={this.handleEmailChange}/></td>
            <td><input type='text' placeholder={content.number} onChange={this.handleNumberChange}/></td>
            <td><input type='text' placeholder={content.content} onChange={this.handleContentChange}/></td>
            <td className='edit' onClick={this.handleEdit.bind(null, content.id)}>done</td>
            <td className='del'  onClick={this.handleClick.bind(null, content.id)}>x</td>
            </tr>
          )
        }
      })
    }else {
      rows.push(<tr key='nodata'><td colSpan='6'>No Data...</td></tr>)
    }
    return (
      <table>
        <thead>
          <tr id='title'>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Content</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}
class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.toPrev = this.toPrev.bind(this);
    this.toNext = this.toNext.bind(this);
  }
  toPrev(){
    this.props.onPrev();
  }
  toNext(){
    this.props.onNext();
  }
  render(){
    return(
      <div>
        <div className='pre' onClick={this.toPrev}>previous</div>
        <div className='next' onClick={this.toNext}>next</div>
        <div className='number'>{this.props.page}</div>
      </div>
    )
  }
}
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
class Msgboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: [],
      input: {
        name: '',
        email: '',
        number: '',
        content: ''
      },
    };
    this.updateData   = this.updateData.bind(this);
    this.handlePrev   = this.handlePrev.bind(this);
    this.handleNext   = this.handleNext.bind(this);
    this.handleInput  = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDel    = this.handleDel.bind(this);
    this.handleToEdit = this.handleToEdit.bind(this);
    this.handleEdit   = this.handleEdit.bind(this);

  }
  componentDidMount() {
    this.updateData();
  }
  updateData() {
    $.ajax({
      url: '/list/' + this.state.page,
      dataType: 'json',
      success: function(data) {
        if (data) {
          this.setState({data: data});
        }else {
          this.setState(prevState => {
            prevState.page--;
          })
        }
      }.bind(this)
    })
  }
  handlePrev() {
    if (this.state.page>1) {
      this.setState(prevState => {
        prevState.page--;
      },this.updateData)
    }else{
      return;
    }
  }
  handleNext() {
    this.setState(prevState => {
      prevState.page++;
    },this.updateData)
  }
  handleInput(name,email,number,content) {
    this.setState({
      input: {
        name:    name,
        email:   email,
        number:  number,
        content: content
      }
    })
  }
  handleSubmit() {
    if (
      formCheck(
      this.state.input.name,
      this.state.input.email,
      this.state.input.number,
      this.state.input.content
      )
    )
    {
      $.ajax({
        url: '/content',
        type: 'post',
        dataType: 'json',
        data: {
          name:    this.state.input.name,
          email:   this.state.input.email,
          number:  this.state.input.number,
          content: this.state.input.content
        },
        success: function(res) {
          this.updateData();
        }.bind(this)
      })
    }
  }
  handleDel(id) {
    $.ajax({
      url: '/del',
      type: 'post',
      dataType: 'json',
      data: {
        id: id
      },
      success: function(res) {
        this.updateData();
      }.bind(this)
    })
  }
  handleToEdit(id) {
    $.ajax({
      url: '/edit',
      type: 'post',
      dataType: 'json',
      data: {
        id: id,
        edit: 0,
      },
      success: function(res) {
        this.updateData();
      }.bind(this)
    })
  }
  handleEdit(id, name, email, number, content) {
    $.ajax({
      url: '/edit',
      type: 'post',
      dataType: 'json',
      data: {
        id: id,
        name: name,
        email: email,
        number: number,
        content: content,
        edit: 1,
      },
      success: function(res) {
        this.updateData();
      }.bind(this)
    })
  }
  render(){
    return(
      <div>
        <Table data={this.state.data} onDel={this.handleDel} onToEdit={this.handleToEdit} onEdit={this.handleEdit}/>
        <Pagination page={this.state.page} onPrev={this.handlePrev} onNext={this.handleNext} />
        <Form onInput={this.handleInput} onSubmit={this.handleSubmit} />
      </div>
    )
  }
}


ReactDOM.render(
  <Msgboard />,
  document.getElementById('app')
);

function formCheck(name,email,number,content) {
  var isPass = true;
  var pattern1 = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  var pattern2 = /^[09]{2}[0-9]{8}$/;
  var pattern3 = /^[\u4E00-\u9FA5]{2,4}$/;
  var warn = $('.warn');
  if(! content){
      warn.show().text('請填寫內容');
      isPass = false;
  }
  if (! pattern2.test(number)){
      warn.show().text('請填寫正確的手機格式');
      isPass = false;
  }
  if(! pattern1.test(email)){
      warn.show().text('請填寫正確的信箱格式');
      isPass = false;
  }
  if(! pattern3.test(name)){
      warn.show().text('請填寫正確的名字');
      isPass = false;
  }
  return isPass;
}
