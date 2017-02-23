import React from 'react';

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

export default Pagination;
