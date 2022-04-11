import React, { Component } from 'react';
import { PAGE_SIZES } from '../../../contants/config';

class ResultPerPage extends Component {
  pageChange = e => {
    this.props.onPageSizeButtonClick(e.target.value);
  };

  render() {
    return (
      <div id="result-per-page">
        <div id="result-dropdown">
          <select
            onChange={this.pageChange}
            disabled={this.props.isDisabled}
            value={this.props.pageSize}
          >
            {PAGE_SIZES.map(size => (
              <option value={size} key={'PAGE_SIZE_'.concat(size)}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <span> per page</span>
      </div>
    );
  }
}

ResultPerPage.defaultProps = {
  isDisabled: false
};

export default ResultPerPage;
