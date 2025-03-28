import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const NewsItem = ({ item }) => {
  
  
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [format_date, setFormatDate] = useState("empty");
  const [format_time, setFormatTime] = useState("empty");

  useEffect(() => {
    if (item.url !== undefined) {
      setUrl(item.url.split("https://").pop().split("/")[0]);
    }
    if (item.publishedAt !== undefined) {
      setFormatDate(item.publishedAt.split("T")[0]);
      setFormatTime(item.publishedAt.split("T")[1]);
    }
  }, [item]);

  const onItemClicked =()=>{
    navigate("/detailed",{state:{item}})
  }

  return (
    <div className="article"  onClick={onItemClicked}>
      <div className="article-image">
        <img src={item.urlToImage} alt={item.title}/>
      </div>
      <div className="article-content">
        <img
          src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${url}&size=14`}
          alt={item.source.id}
        />
        <span>{item.source.name}</span>
      </div>
      <div className="article-title">
        <h2>{item.title}</h2>
      </div>
      <p className="article-description">{item.description}</p>
      <div className="article-details">
        <small>
          <b>Published At: </b>
          {format_date} {format_time}
        </small>
      </div>
    </div>
  );
};

export default NewsItem;
