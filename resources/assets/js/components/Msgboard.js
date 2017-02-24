import React from 'react'
import Table from './Table'
import Form from './Form'
import Pagination from './Pagination'
import Actions from '../actions/Actions';
import { connect } from 'react-redux'

class Msgboard extends React.Component {
  componentDidMount() {
    this.props.load(this.props.page);
  }

  // componentWillReceiveProps(nextProps, nextContext) {
  //   this.props.load(nextProps.page);
  // }

  render() {
    return(
      <div>
        <Table
          data={this.props.data}
          onDelete={this.props.delete}
          onModify={this.props.update}
        />
        <Pagination
          page={this.props.page}
          onPrev={this.props.prev}
          onNext={this.props.next}
        />
        <Form
          onSubmit={this.props.create}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  page: state.MsgReducer.page,
  data: state.MsgReducer.data
})

const mapDispatchToProps = {
  next:   Actions.next,
  prev:   Actions.prev,
  load:   Actions.load,
  create: Actions.create,
  update: Actions.update,
  delete: Actions.delete,
}

export default Msgboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Msgboard);
