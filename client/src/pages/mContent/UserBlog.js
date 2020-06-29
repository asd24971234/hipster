import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getBlogDataAsync } from '../../actions/blog'

import author1 from '../../images/blog/author1.jpg'
import userBlogTop from '../../images/blog/userBlogTop.png'

function UserBlog(props) {

  const { blogData,getBlogDataAsync } = props
  console.log('blogData', blogData)
  let blogDataRp = []
  // if(blogData){console.log('blogData', blogData)}

  if(blogData[0]){
    console.log('blogData-Content', blogData[0].articleContent)
    blogDataRp = blogData.map((item)=>{
      const reg = /<(?:.|\s)*?>/g      
      item.articleContent=item.articleContent.replace(reg,'')
      return item
    })  
  }  

  useEffect(() => {
    getBlogDataAsync()   
  }, [])  

  const showBlogList = blogDataRp.map((item)=>{
    return (
    <>
      <hr />      
      <div className="row userblog-list-item" key={item.articleId}>
        <Link to={"/blogDetail/" + item.articleId} className="d-block col-2">
          <img src={item.articleImg} />
        </Link>
        <Link to={"/blogDetail/" + item.articleId} className="d-block col-8">
          <h3>{item.articleTitle}</h3>
          <p>{item.articleContent}</p>
          <p>{item.created_at}</p>
        </Link>
        <div className="col-2">
          <Link to={"/blogEdit/" + item.articleId} className="btn"><i class="fas fa-edit"></i></Link>
          <button className="btn">
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>      
    </>
    )
  })

  return (
    <>
      <h3 className="ml-3 mt-3">我的文章</h3>
      <div className="row userBlogTop">
        <img src={userBlogTop} />
      </div>
      <div className="row userblog-btn-row">
        <Link to="/blogAdd/" className="btn userblog-btn d-block">發表新文章</Link>
      </div>
      {showBlogList}     
    </>
  )
}

const mapStateToProps = (store) =>({ blogData: store.blogReducer.blogData})

export default withRouter(connect(mapStateToProps, {
  getBlogDataAsync,
})(UserBlog))