import React, {Component} from 'react';

const Posts = () => (
  <div className="posts mt-3 border">
    <div className="post bg-light p-3">
      <img
        src="https://pbs.twimg.com/profile_images/1006115924460486656/bi-IZ1PO_normal.jpg"
        className="rounded float-left"
      />
      <div className="content ml-5 pl-3">
        <span>User Name</span>
        <span className="small ml-3">1 minute ago</span>
        <p>
          これはテストです。これはテストです。これはテストです。これはテストです。これはテストです。これはテストです。これはテストです。これはテストです。これはテストです。これはテストです。これはテストです。これはテストです。これはテストです。これはテストです。これはテストです。これはテストです。これはテストです。これはテストです。これはテストです。これはテストです。
        </p>
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
      </div>
    </div>
  </div>
);

export default Posts;
