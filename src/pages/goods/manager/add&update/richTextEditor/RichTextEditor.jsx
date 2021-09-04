import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PropTypes from 'prop-types'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import './richTextEditor.less'


export default class RichTextEditor extends Component {
  constructor(props) {
    super(props)
    const html = this.props.detail
    if (html) {
      const content = htmlToDraft(html)
      const contentState = ContentState.createFromBlockArray(content.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      this.state = {
        editorState
      }
    } else {
      this.state = {
        editorState: EditorState.createEmpty(),
      }
    }
  }

  static propTypes = {
    detail: PropTypes.string
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  getDetail = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
        editorState={editorState}
        toolbarClassName="toolbar"
        wrapperClassName="wrapper"
        editorClassName="editor"
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          inline: {dropdownClassName: 'dropdown'},
          blockType: {dropdownClassName: 'dropdown'},
          fontSize: {dropdownClassName: 'dropdown'},
          fontFamily: {dropdownClassName: 'dropdown'},
          image: {popupClassName: 'dropdown'},
        }}
      />
      <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      />
      </div>
    );
  }
}