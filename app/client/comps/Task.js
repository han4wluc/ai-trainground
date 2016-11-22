
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
    const { editorId } = this.props;
    this.editor = ace.edit(editorId);
    this.editor.setTheme("ace/theme/monokai");
    this.editor.getSession().setMode("ace/mode/python");       
  }

  _onClickSubmit(){

    // console.log('props', this.props)

    const {
      submissionRequestAction,
      index,
      url,
      name,
      baseAction,
    } = this.props;

    // console.log('submissionRequestAction', submissionRequestAction)

    console.log('name1', name);

    submissionRequestAction({
      textValue: this.editor.getValue(),
      index,
      url,
      name,
      baseAction,
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
      editorId,
      style,
    } = this.props;

    return (
      <div style={{
        flex:1,
        ...style,
      }}>
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
            id={editorId}
            style={{
              flex:1,
              height: '200px',
            }}
          >{codePlaceholder}</div>

          </div>

        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            height: '100px',
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
