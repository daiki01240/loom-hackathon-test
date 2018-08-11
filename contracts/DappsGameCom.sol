pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract GameTokens is StandardToken {
  string public name = "GameToken";
  string public symbol = "GAME";
  uint public decimals = 18;
  uint public initialSupply =1000;
  function MyToken() public {
    totalSupply_ = initialSupply;
    balances[msg.sender] = initialSupply;
  }
}
contract DappGameCom {

    struct Game {
        string title;
    }

    struct Comment {
        string text;
    }

    struct Post {
        string text;
        string contentHash;
        // 'video'|'image'
        string contentType;
    }

    mapping (uint => uint[]) public postsFromGame;
    mapping (address => uint[]) public postsFromAccount;
    mapping (uint => uint[]) public commentsFromPost;
    mapping (uint => address) public commentFromAccount;

    Game[] public games;
    Post[] public posts;
    Comment[] public comments;

    event NewPostAdded(uint postId, uint commentId, uint indexed gameId, address owner);
    event NewCommentAdded(uint postId, uint commentId, address owner);

    constructor () public {
        // created the first post and comment with ID
        // IDs 0 are invalid
        newPost("", 0, "", "_contentType");
        newComment(0, "");
        newGame("Zombie Battleground");
    }

    function hasPosts() public view returns(bool _hasPosts) {
        _hasPosts = posts.length > 0;
    }

    function newGame(string _title) public {
        Game memory game = Game(_title);
        games.push(game);
    }

    function newPost(string _text, uint _gameId, string _contentHash, string _contentType) public {
        Post memory post = Post(_text, _contentHash, _contentType);
        uint postId = posts.push(post) - 1;
        postsFromAccount[msg.sender].push(postId);
        postsFromGame[_gameId].push(postId);
        emit NewPostAdded(postId, 0, _gameId, msg.sender);
    }

    function newComment(uint _postId, string _text) public {
        Comment memory comment = Comment(_text);
        uint commentId = comments.push(comment) - 1;
        commentsFromPost[_postId].push(commentId);
        commentFromAccount[commentId] = msg.sender;
        emit NewCommentAdded(_postId, commentId, msg.sender);
    }

    function getPostsFromGame(uint _gameId) external view returns (uint[]){
        return postsFromGame[_gameId];
    }

}
