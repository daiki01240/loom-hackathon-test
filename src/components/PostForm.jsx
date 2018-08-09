import React, {Component} from 'react';

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
          <input
            className="content-form mt-2"
            type="file"
          />
          <button className="btn btn-primary my-2 float-right" type="submit">Post</button>
        </form>
      </div>
    );
  }
}

export default PostForm;
