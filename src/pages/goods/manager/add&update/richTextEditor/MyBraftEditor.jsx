import React, { Component } from 'react'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'

export default class MyBraftEditor extends Component {

  state = {
    editorState: BraftEditor.createEditorState(),
    outputHtml: '<p></p>'
  }

  UNSAFE_componentWillUpdate () {

  }

  // 实时回调
  handlecChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHtml: editorState.toHTML()
    })
  }

  render() {
    const {editorState, outputHTML} = this.state
    return (
      <div>
        <div>
          <BraftEditor
            style={{
              minHeight: '150px'
            }}
            contentStyle={{
              borderTop: '1px solid #666',
              height: '200px',
              minHeight: '200px'
            }}
            value={editorState}
            onChange={this.handlecChange}
          />
        </div>
        <h5>Content</h5>
        <div className="output-content">{outputHTML}</div>
      </div>
    )
  }
}
