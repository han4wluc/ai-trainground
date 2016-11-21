
import React, { Component } from 'react';

export default class Chooser extends Component {

  static propTypes = {
    codePlaceholder: React.PropTypes.string,
    description: React.PropTypes.string,
    formula: React.PropTypes.string,
    status: React.PropTypes.string,
    statusMessage: React.PropTypes.string,
    // submissionRequestAction: React.PropTypes.func,
    title: React.PropTypes.string,
    url: React.PropTypes.string,
  }

  componentDidMount() {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/monokai");
    this.editor.getSession().setMode("ace/mode/python");       
  }

  _onClickSubmit(){

    // console.log('props', this.props)

    const {
      submissionRequestAction,
      index,
    } = this.props;

    // console.log('submissionRequestAction', submissionRequestAction)

    submissionRequestAction({
      textValue: this.editor.getValue(),
      index,
    });
  }

  render() {

    const {
      title,
      description,
      formula,
      codePlaceholder,
      status,
      statusMessage,
      url,
    } = this.props;

    return (
      <div style={{flex:1}}>
        <div
          style={{
            display: 'flex',
            flex:1,
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              // display: 'flex',
              flex:1,
              borderColor: 'red',
              borderWidth: '2px',
              borderStyle: 'solid'
            }}
          >
            <h3>
              {title}
            </h3>
            <p>
              {description}
            </p>
            <img
              src={`http://latex.codecogs.com/gif.latex?{${formula}}`}
              border="0"
            />
          </div>
          <div
            style={{
              display: 'flex',
              flex:1,
              borderColor: 'red',
              borderWidth: '2px',
              borderStyle: 'solid'
            }}
          >
          <div
            id="editor"
            style={{
              flex:1,
              height: '100px',
            }}
          >{codePlaceholder}</div>

          </div>

        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            height: '200px',
          }}
        >
          <div>
            <button onClick={this._onClickSubmit.bind(this)}>Submit</button>
          </div>
          <div>{status}</div>
          <div
            style={{
              display: 'flex',
              flex:1,
              borderColor: 'red',
              borderWidth: '2px',
              borderStyle: 'solid'
            }}
          >
            {statusMessage}
          </div>
        </div>
      </div>
    );
  }
}
