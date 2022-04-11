import React, { Component } from 'react';
import ResultPerPage from './ResultPerPage/ResultPerPage';
import ResultDisplayLabel from './ResultDisplayLabel/ResultDisplayLabel';
import PageDirection from './PageDirection/PageDirection';

import './Pagination.scss';

class Pagination extends Component {
  render() {
    let pages = Math.floor(this.props.totalResults / this.props.pageSize);
    pages += this.props.totalResults % this.props.pageSize ? 1 : 0;

    return (
      <div className="Pagination">
        <ResultPerPage
          pageSize={this.props.pageSize}
          onPageSizeButtonClick={this.props.onPageSizeButtonClick}
          isDisabled={this.props.isDisabled}
        />
        <ResultDisplayLabel
          page={this.props.page}
          pages={pages}
          totalResults={this.props.totalResults}
        />
        <PageDirection
          page={this.props.page}
          pages={pages}
          onPageButtonClick={this.props.onPageButtonClick}
          isDisabled={this.props.isDisabled}
        />
      </div>
    );
  }
}

Pagination.defaultProps = {
  isDisabled: false
};

export default Pagination;
