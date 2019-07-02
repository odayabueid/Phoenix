import React from 'react';

class Comments extends React.Component{
    constructor(props){
          super(props);
        this.state = {
          comment: "",
          likes: 0
        }

    }

    render(){
        return(
            <div> 
             <p>Comments:</p>
              <input></input>
              <button>comment</button>
            </div>
        )
    }
}

export default Comments;