import React, {Component} from 'react';
import { ipfs } from '../ipfs';

class PostForm extends Component {
  contentTypeMap;

  constructor(props) {
    super(props);
    this.state = {
      post: '',
      contentHash: '',
      contentType: '',
      error: ''
    }
    this.contentTypeMap = new Map([
      ['video', ['mp4']],
      ['image', ['png', 'jpg', 'gif']]
    ])
  }

  handlePostChange(post) {
    this.setState({ post });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.post, this.state.contentHash);
  }

  handleFileChange (event) {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    this.state.contentType = this._getContentType(file.name);
    if (!this.state.contentType) {
      this.setState({error: 'FileType not Supported'});
      console.log(this.state.error);
      return;
    }
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  }

  _getContentType(fileName) {
    const extension = fileName.slice(fileName.lastIndexOf('.')+1);
    let contentType = '';
    for (const [key, value] of this.contentTypeMap) {
      if (value.indexOf(extension) !== -1) {
        contentType = key;
      }
    }
    return contentType;
  }

  async convertToBuffer(reader) {
    // file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    ipfs.add(buffer, (err, files) => {
      if (err) {
        this.setState({error: error});
        return;
      }
      this.setState({ contentHash: files[0].hash, contentType: this.state.contentType });
      console.log(this.state.contentHash);
    });
  }

  render() {
    return (
      <div className="post-form bg-light clearfix border">
        <form
          className="post-form p-3"
          value={this.state.post}
          onSubmit={e => this.handleSubmit(e)}
        >
          <textarea
            className="form-control"
            type="text"
            size="30"
            placeholder="どんな情報を共有しますか？"
            onChange={e => this.handlePostChange(e.target.value)}
           />
          {this.state.error ? <div className="alert alert-danger mt-2">{this.state.error}</div> : ''}
          <input
            className="content-form mt-2"
            type="file"
            onChange={e => this.handleFileChange(e)}
          />
          <button className="btn btn-primary my-2 float-right" type="submit">Post</button>
        </form>
      </div>
    );
  }
}

export default PostForm;
