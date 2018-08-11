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
      gameId: 0,
      posts: [{postId: 0, text: 'aaa', contentHash:'test'}],
      tx: '',
    };
  }

  async setPostsFromGame(){
    const postIds = await this.contract.getPostsFromGame(this.state.gameId);
    const posts = await Promise.all(
      postIds.map( async id  => {
        const result = await this.contract.getPosts(id);
        const array = {postId: id, text: result.text, contentHash:result.contentHash};
        return array;
      })
    );
    this.setState({ posts });
  }

  async componentWillMount() {
    await this.contract.loadContract();
    await this.setPostsFromGame();
    this.contract._contract.events.NewPostAdded(
      {
        filter: {gameId: this.state.gameId}
      },
      () => {
        console.log('NewPostAdded!!');
        this.setPostsFromGame();
      }
    );
  }

  async handlePostSubmit(post, contentHash, contentType){
    console.log(contentType);
    const tx = await this.contract.newPost(post, this.state.gameId, contentHash, contentType);
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
            <PostForm
              onSubmit={ (post, contentHash, contentType) => this.handlePostSubmit(post, contentHash, contentType)}
            />
            <Posts
              posts={this.state.posts}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TimeLine;
