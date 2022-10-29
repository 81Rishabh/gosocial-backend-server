class ToggleLike{
    constructor(toggleElement) {
       this.toggler = toggleElement;
       this.toggleLike();
     }

    toggleLike() {
         $(this.toggler).click(function(e) {
             e.preventDefault();
             let self = this;
            
            //  this is the new way to writing  ajax which you might've studiend
            $.ajax({
                type: "post",
                url: $(self).attr('href')
            })
            .done(function(data){
                var likeCount = parseInt($(self).attr('data-likes'));
                let deleted = data.data.deleted;
           
                if(deleted) {
                    likeCount -= 1;
                }
                else {
                    likeCount += 1;
                }

                $(self).attr('data-likes' , likeCount);
                $('.likes-count').html(`Likes: ${likeCount}`);
            })
            .fail(function(err){
              console.log('error in completing the request' , err);
            })
         });
    }
}

