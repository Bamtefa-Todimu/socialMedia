import React from 'react'
import {stories} from '../../stories'
import './stories.css'

const Stories = () => {
  return (
    <div className="stories-container">
      <div className="stories-wrapper">
        <li></li>
        {stories.map((story) => {
          return (
            
              <div key = {story.storyId} className="story-container">
                <div className="story-image-container">

                <div className="story-image">
                  <img src={story.authorPicture} alt="" />
                </div>
                </div>
                <div className="story-name">
                  {story.author}
                </div>
              </div>
            
          )
        })}
      </div>
    </div>
  )
}

export default Stories