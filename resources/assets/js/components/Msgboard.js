import React from 'react';
import Table from './Table';
import Form from './Form';
import Pagination from './Pagination';


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
  }

  componentDidMount() {
    this.updateData();
  }

  updateData = () => {
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

  handlePrev = () => {
    if (this.state.page>1) {
      this.setState(prevState => {
        prevState.page--;
      },this.updateData)
    }else{
      return;
    }
  }

  handleNext = () => {
    if (this.state.data.length) {
      this.setState(prevState => {
        prevState.page++;
      },this.updateData)
    }
  }

  handleInput = (name,email,number,content) => {
    this.setState({
      input: {
        name:    name,
        email:   email,
        number:  number,
        content: content
      }
    })
  }

  handleSubmit = () => {
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

  handleDelete = (id) => {
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

  handleModify = (id, content) => {
    $.ajax({
      url: '/edit',
      type: 'post',
      dataType: 'json',
      data: {
        id:      id,
        name:    content.name,
        email:   content.email,
        number:  content.number,
        content: content.content,
        edit: 1,
      },
      success: function(res) {
        this.updateData();
      }.bind(this)
    })
  }

  render() {
    return(
      <div>
        <Table
          data={this.state.data}
          onDelete={this.handleDelete}
          onModify={this.handleModify}
        />
        <Pagination
          page={this.state.page}
          onPrev={this.handlePrev}
          onNext={this.handleNext}
        />
        <Form
          onInput={this.handleInput}
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

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

export default Msgboard;
