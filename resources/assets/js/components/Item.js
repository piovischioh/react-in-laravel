import React from 'react';

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: false
    }
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.handleChange   = this.handleChange.bind(this);
  }

  toggleEditMode() {
    this.setState({ editable: !this.state.editable });
  }

  renderViewMode() {
    const {
      content,
      onDelete
    } = this.props;
    return (
      <tr key={content.id}>
        <td>{content.name}</td>
        <td>{content.email}</td>
        <td>{content.number}</td>
        <td>{content.content}</td>
        <td className='edit' onClick={this.toggleEditMode}>edit</td>
        <td className='del'  onClick={() => { onDelete(content.id) }}>x</td>
      </tr>
    );
  }

  handleChange(e) {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    })
  }

  renderEditMode() {
    const {
      content,
      onModify,
      onDelete
    } = this.props;
    return (
      <tr>
        <td>
          <input
            type='text'
            name='name'
            defaultValue={content.name}
            // value={this.state.name} //Controlled
            onChange={this.handleChange}
          />
        </td>
        <td>
          <input
            type='text'
            name='email'
            defaultValue={content.email}
            // value={this.state.email}
            onChange={this.handleChange}
          />
        </td>
        <td>
          <input
            type='text'
            name='number'
            defaultValue={content.number}
            // value={this.state.number}
            onChange={this.handleChange}
          />
        </td>
        <td>
          <input
            type='text'
            name='content'
            defaultValue={content.content}
            // value={this.state.content}
            onChange={this.handleChange}
          />
        </td>
        <td className='edit' onClick={() => { onModify(content.id, this.state); this.toggleEditMode() }}>done</td>
        <td className='del'  onClick={() => { onDelete(content.id) }}>x</td>
      </tr>
    );
  }

  render() {
    return this.state.editable ? this.renderEditMode() : this.renderViewMode()
  }
}

export default Item;
