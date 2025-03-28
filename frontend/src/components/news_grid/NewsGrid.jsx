import React from 'react'
import NewsItem from '../news_item/NewsItem'

const NewsGrid = ({items}) => {
  return (
    <div className='news-grid'>
      { items.map((item,ind)=>(
          <NewsItem key={ind} item = {item}/>
        ))
      }
    </div>
  )
}

export default NewsGrid