{  
    let createPost = function(e) {
        let newPostForm = $('#new-post-form');
        
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: "POST",
                url : "/posts/create-post",
                data : newPostForm.serialize(),
                success: function(data) {
                    let newPost = newPostDom(data.data.post);
                    let posts = $('#posts > ul');
                     if(posts.length == 0) {
                         $('#posts > ul').append(newPost);
                     }
                     else {
                        $('#posts > ul').prepend(newPost);
                     }
                     let deleteLink = $('.delete-post-link');
                     deletePost(deleteLink);

                       //   Notyfiy when post has created using Noty
                      NotificationToDom(data.message , 'success');
                },
                 error : function(err) {
                    NotificationToDom(err.responseText , 'error');
                }
            });
        });
    }


    let newPostDom = function(post) {
        return $(`
              <li class="post-items" id="post-items-${post._id}">
                <div class="post">
                    <p id="post-content">
                       ${post.content}
                    </p>
                    <div class="post-footer">
                        <p>
                            Created by :- You
                        </p>
                    </div>
                    <div id="post-comment">
                        <form action="/comments/create" method="post">
                            <input type="text" name="content" placeholder="Type here to add comment" required/>
                            <input type="hidden" name="postId"  value="${post._id}" />
                            <input type="submit" value="Add Comment">
                        </form>
                        <button type="button" class="delete-post-btn">
                             <a class="delete-post-link" href="/posts/destroy/${post._id}" >Delete Post</a>
                        </button>
                    </div>
                    <div id="post-comment-container">
                        <h5>Comments</h5>
                    </div>
                </div>
            </li>
        `)
    } 

   let deletePost = function(deleteLink) {
    $(deleteLink).on('click', function(e){
        e.preventDefault();
        $.ajax({
            type: "get",
            url : $(deleteLink).attr('href'),
            success: function(data) {
               $(`#post-items-${data.post_id}`).remove();

               //   Notyfiy when post has created using Noty
               NotificationToDom(data.message , 'success');
            },
            error : function(err) {
                NotificationToDom(err.responseText , 'error');
            }
        });
    });
   }

//  create comment 
   let createComment = function() {
      const CommentForm = $('#add-comment-form');

      CommentForm.on('submit', function(e){
          e.preventDefault();
         
          $.ajax({
            type: "POST",
            url : "/comments/create",
            data : CommentForm.serialize(),
            success: function(data) {
                console.log(data.data);
                let newComment =  newCommentToDom(data.data.comments);
                  
                // prepend the list to comment container
                $('#post-comment-container ul').prepend(newComment);

                // Notifymessage to user
                NotificationToDom(data.message , 'success');

                // delete link
                deleteComment($('.del-comment-link') , false);
            },
             error : function(err) {
                NotificationToDom(err.responseText , 'error');
            }
        });
          
      });
   }
  
//  Render comment to the dom
   let newCommentToDom = function(comment) {
        return $(`
            <li class="post-comment-list-items" id="post-comment-${comment._id}">
                <div>
                <p class="post-comment-content">🖋️ ${comment.content} </p>
                <small class="post-comment-user">commented by:  you </small>
                </div>  
                <div class="comment-actions">
                     <a class="del-comment-link" href="/comments/destroy/${comment._id }">X</a>
                </div>
            </li>
        `)
   }
    
//   Delete comment
let deleteComment = function(deleteLink , isPageLoaded) {
    
    if(!isPageLoaded) {
        $(deleteLink).on('click', function(e){
            e.preventDefault();
            $.ajax({
                type: "get",
                url : deleteLink.attr('href'),
                success: function(data) {
                   $(`#post-comment-${data.comment_id}`).remove();
    
                   //   Notyfiy when post has created using Noty
                   NotificationToDom(data.message , 'success');
                },
                error : function(err) {
                    NotificationToDom(err.responseText , 'error');
                }
            });
        }); 
    }
    else {
        $.ajax({
            type: "get",
            url : `${deleteLink}`,
            success: function(data) {
               $(`#post-comment-${data.comment_id}`).remove();

               //   Notyfiy when post has created using Noty
               NotificationToDom(data.message , 'success');
            },
            error : function(err) {
                NotificationToDom(err.responseText , 'error');
            }
        });
    }
}

// Delete comment when page reloaded
const DeleteLinks = document.querySelectorAll('.del-comment-link');
for(let i = 0; i < DeleteLinks.length; i++) {
    DeleteLinks[i].addEventListener('click', e => {
        e.preventDefault();
        var attr = e.target.getAttribute('href');
        deleteComment(attr , true);
    });
}
  
//   Posts create and delelte actions
    createPost();

 //  Comments create and delelte actions
    createComment();

    
    //   Notify user
   let NotificationToDom = function(message , type) {
    new Noty({
       layout : 'topRight',
       theme : 'relax',
       text : message,
       type : type,
       timeout : 1000
    }).show();
  }

}