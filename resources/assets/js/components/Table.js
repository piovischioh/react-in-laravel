import React from 'react';
import Item from './Item';

class Table extends React.Component {
  render(){
    const {
      data,
      ...rest
    } = this.props;
    console.log(data)
    let rows = [];
    if (data.size) {
      data.forEach(content => {
        rows.push(
          <Item
            key={content.id}
            content={content}
            {...rest}
          />
        )
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

export default Table;
