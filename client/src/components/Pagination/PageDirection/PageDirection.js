import React, { Component } from 'react';

class PageDirection extends Component {
  calculatePages = () => {
    const currentPage = this.props.page;
    const totalPages = this.props.pages;
    let pages = [];
    if (totalPages <= 5) {
      pages.push(1);
      for (let i = 1; i < totalPages; i++) {
        pages.push(i + 1);
      }
    } else {
      pages.push(1);
      if (currentPage <= 3) {
        pages.push(2, 3);
      } else {
        pages.push('...');
      }

      if (3 < currentPage && currentPage < totalPages - 2) {
        pages.push(currentPage);
      }
      if (currentPage >= totalPages - 2) {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push('...', totalPages);
      }
    }
    return pages;
  };

  handlePageButtonClick = nextPage => {
    this.props.onPageButtonClick(nextPage);
  };

  renderPreviousButton = () => {
    if (this.props.page === 1) {
      return;
    }
    return (
      <button
        className="previous-page"
        aria-label="Previous"
        disabled={this.props.isDisabled}
        onClick={() => this.handlePageButtonClick(this.props.page - 1)}
      >
        &lt;
      </button>
    );
  };

  renderNextButton = () => {
    if (this.props.page === this.props.pages || !this.props.pages) {
      return;
    }
    return (
      <button
        className="previous-page"
        aria-label="Previous"
        disabled={this.props.isDisabled}
        onClick={() => this.handlePageButtonClick(this.props.page + 1)}
      >
        &gt;
      </button>
    );
  };

  render() {
    const pageValues = this.calculatePages();

    return (
      <div className="page-direction">
        {this.renderPreviousButton()}
        {pageValues.map((page, index) => {
          if (this.props.page === page) {
            return (
              <button
                className="number-page active"
                disabled={this.props.isDisabled}
                key={'PAGES_'.concat(index)}
              >
                {page}
              </button>
            );
          }
          if (page === '...') {
            return (
              <span
                aria-hidden="true"
                className="dotdotdot"
                key={'PAGES_'.concat(index)}
              >
                ...
              </span>
            );
          }
          return (
            <button
              className="number-page"
              onClick={() => this.handlePageButtonClick(page)}
              key={'PAGES_'.concat(index)}
              disabled={this.props.isDisabled}
            >
              {`${page}`}
            </button>
          );
        })}
        {this.renderNextButton()}
      </div>
    );
  }
}

PageDirection.defaultProps = {
  isDisabled: false
};

export default PageDirection;
