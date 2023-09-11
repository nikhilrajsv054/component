import React from 'react'

const Comments = () => {
const [newComment, setNewComment] = useState(); 

  return (
    <div>
        <input
          type="text"
          placeholder="Title"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        
    </div>
  )
}

export default Comments
