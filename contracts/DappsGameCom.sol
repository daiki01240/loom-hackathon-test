pragma solidity ^0.4.24;

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
    }

    mapping (address => uint[]) public postsFromAccount;
    mapping (uint => uint[]) public commentsFromPost;
    mapping (uint => address) public commentFromAccount;

    Game[] public games;
    Post[] public posts;
    Comment[] public comments;

    event NewPostAdded(uint postId, uint commentId, address owner);

    constructor () public {
        // created the first post and comment with ID
        // IDs 0 are invalid
        newPost("", "");
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

    function newPost(string _text, string _contentHash) public {
        Post memory post = Post(_text, _contentHash);
        uint postId = posts.push(post) - 1;
        postsFromAccount[msg.sender].push(postId);
        emit NewPostAdded(postId, 0, msg.sender);
    }

    function newComment(uint _postId, string _text) public {
        Comment memory comment = Comment(_text);
        uint commentId = comments.push(comment) - 1;
        commentsFromPost[_postId].push(commentId);
        commentFromAccount[commentId] = msg.sender;
        emit NewPostAdded(_postId, commentId, msg.sender);
    }

}
