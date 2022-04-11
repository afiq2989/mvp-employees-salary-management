import React, { Component } from 'react';

class ResultDisplayLabel extends Component {
  render() {
    return (
      <div id="result-display-label">
        <p>
          <small>
            Displaying page <b>{this.props.page}</b> of{' '}
            {this.props.pages ? this.props.pages : 1} ({this.props.totalResults}{' '}
            total results)
          </small>
        </p>
      </div>
    );
  }
}

export default ResultDisplayLabel;
