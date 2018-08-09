import React, {Component} from 'react';

import GameInfo from './GameInfo';
import PostForm from './PostForm'
import Posts from './Posts';

import Contract from '../contract';

class TimeLine extends Component {
  constructor(props) {
    super(props);

    this.contract = new Contract();

    this.state = {
      posts: [],
      tx: '',
    };
  }

  async componentWillMount() {
    await this.contract.loadContract();
    const posts = await this.contract.getPosts(0);
    console.log(posts);
  }

  async handlePostSubmit(post){
    const tx = await this.contract.newPost(post, 'test');
    this.setState({ tx });
    console.log(tx);
  }

  async confirmValue() {
    const tx = await this.contract.setValue(this.value)
    this.setState({ tx })
  }

  render(){
    return (
      <div className="post-page mt-3">
        <div className="row">
          <div className="col-3">
            <GameInfo />
          </div>
          <div className="main col-9">
            <PostForm onSubmit={post => this.handlePostSubmit(post)}/>
            <Posts />
          </div>
        </div>
      </div>
    )
  }
}

export default TimeLine;
