import React, {Component} from 'react';

import GameInfo from './GameInfo';
import PostForm from './PostForm';
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
      user: 'DaiDai',
    };
  }

  async setPostsFromGame(){
    const postIds = await this.contract.getPostsFromGame(this.state.gameId);
    let posts = await Promise.all(
      postIds.map( async id  => {
        const result = await this.contract.getPosts(id);
        const array = {
          postId: id,
          text: result.text,
          contentHash:result.contentHash,
          contentType:result.contentType,
        };
        return array;
      })
    );
    posts = posts.sort((a, b) => +a.postId < +b.postId)
    this.setState({ posts });
  }

  getUserKey(){
    const userKey = {
      'DaiDai' : [88, 216, 182, 107, 230, 76, 255, 64, 30, 17, 61, 88, 92, 28, 8, 106, 189, 118, 170, 107, 21, 223, 199, 152, 198, 92, 108, 67, 102, 224, 19, 114, 106, 123, 38, 72, 237, 3, 140, 101, 206, 122, 167, 11, 230, 229, 95, 141, 234, 157, 148, 98, 57, 56, 152, 83, 134, 225, 158, 54, 146, 58, 130, 16],
      'd-machi': [117, 206, 176, 255, 39, 171, 14, 144, 180, 116, 109, 153, 30, 23, 175, 177, 25, 104, 17, 120, 62, 112, 58, 134, 121, 97, 28, 233, 210, 22, 156, 133, 132, 2, 137, 94, 143, 53, 5, 196, 197, 153, 192, 17, 179, 103, 184, 255, 103, 44, 226, 158, 86, 151, 57, 49, 246, 163, 156, 5, 64, 94, 79, 79],
      'torike' : [58, 150, 207, 228, 155, 86, 58, 0, 231, 80, 141, 217, 115, 196, 254, 89, 250, 59, 185, 109, 156, 191, 65, 163, 190, 214, 78, 250, 26, 45, 138, 205, 64, 128, 58, 66, 50, 78, 152, 188, 242, 77, 147, 59, 37, 189, 12, 182, 187, 3, 78, 216, 184, 180, 55, 69, 27, 152, 45, 163, 84, 86, 103, 112],
    }
    return new Uint8Array(userKey[this.state.user])
  }

  async componentWillMount() {
    console.log(this.state.user);
    await this.contract.loadContract(this.getUserKey());
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

  async componentDidUpdate() {
    await this.contract.loadContract(this.getUserKey());
  }

  async handlePostSubmit(post, contentHash, contentType){
    console.log(contentType);
    const tx = await this.contract.newPost(post, this.state.gameId, contentHash, contentType);
    this.setState({ tx });
    console.log(tx);
  }

  async getToken() {
    const tx = await this.contract.getToken()
    this.setState({ tx })
    console.log(tx)
  }

  render(){
    return (
      <div className="post-page mt-3">
        <div className="row">
          <div className="col-3">
            <GameInfo />
          </div>
          <div className="main col-9">
            <div className="input-group select-account bg-light border mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text">UserAccount</label>
              </div>
              <select
                className="custom-select"
                value={this.state.user}
                onChange={e => this.setState({user: e.target.value})}
              >
                <option value="DaiDai">DaiDai</option>
                <option value="d-machi">d-machi</option>
                <option value="torike">torike</option>
              </select>
              <div className="get-token ml-1">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={ () => this.getToken() }
                >Get 1000 token</button>
              </div>
            </div>
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
