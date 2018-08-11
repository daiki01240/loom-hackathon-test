import React, {Component} from 'react';

class Posts extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    console.log(this.props.posts);

    const IPFS_BASE_URL = 'https://ipfs.infura.io/ipfs/';

    let HasContent = post => {
      console.log();
      if (post.post.contentHash != '') {
        return <img src={IPFS_BASE_URL + post.post.contentHash} />
      } else {
        return ''
      }
    }

    return (
      <div className="posts mt-3">
        {this.props.posts.map(post => (
          <div className="post bg-light p-3 mb-3 border clearfix" key={post.postId}>
            <img
              src="https://pbs.twimg.com/profile_images/1006115924460486656/bi-IZ1PO_normal.jpg"
              className="rounded float-left"
            />
            <div className="content ml-5 pl-3">
              <span>User Name</span>
              <span className="small ml-3">1 minute ago</span>
              <p>
                {post.text}
              </p>
              <HasContent post={post}/>
              <div className="like float-right">
                <button type="button" className="btn btn-success btn-sm">Like</button>
              </div>
              {/*
              <hr/>
              <div className="comment">
                <img
                  src="https://pbs.twimg.com/profile_images/1006115924460486656/bi-IZ1PO_normal.jpg"
                  className="rounded float-left"
                />
                <div className="comment-content ml-5 pl-3">
                  <span>User Name</span>
                  <p>
                    これはコメントです。これはコメントです。これはコメントです。
                  </p>
                </div>
              </div>
              */}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Posts;
