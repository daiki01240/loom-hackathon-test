import React, {Component} from 'react';
import { ipfs } from '../ipfs';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
      image_src: '',
    }
  }

  handlePostChange(post) {
    this.setState({ post });
  }

  // handleFileChange(files) {
  //   this.setState({ image_src: createObjectURL(files[0]) });
  //   console.log(files);
  // }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.post);
  }

  handleFileChange (event) {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  }

  async convertToBuffer(reader) {
    // file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    ipfs.add(buffer, (err, files) => {
      if (err) {
        this.err = err;
        return;
      }
      this.ipfsHash = files[0].hash;
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
          {this.err ? <div className="alert alert-danger">{this.err}</div> : ''}
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
