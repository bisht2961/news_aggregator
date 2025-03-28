import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchNewsContent, fetchNewsSummary } from "../../store/actions/newsAction";
import { useDispatch, useSelector } from "react-redux";

const DetailedNews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [item, SetItem] = useState(null);
  // const token = useSelector((state) => state.token);
  // const newsContent = useSelector((state) => state.item);
 
  useEffect(() => {
    if (location.state === null) {
      navigate("/");
    } else {
      SetItem(location.state.item);
      const data = {
        token: token.refreshToken,
        item: location.state.item,
      };
      dispatch(fetchNewsContent(data));
    }
  }, []);

  useEffect(() => { 
    if ( newsContent !== undefined ) {
      SetItem(newsContent);
    }
  }, [newsContent]);

  const generateSummaryClick = () => { 
    if( item !== null ) {
      const data = {
        item: item,
      };
      dispatch(generateSummary(data));
    }
  };

  return (
    <div>
      {item !== null && (
        <>
          <div className="image-div">
            <img src={item.urlToImage} alt={item.title}></img>
          </div>
          <div className="summary_button">
            <button onClick={()=>{generateSummaryClick()}}>Generate Summary</button>
          </div>
          <div className="detailed-news-title">
            <h1>{item.title}</h1>
            { item.content !== null ? <p>{item.content}</p> : <><p>no content Found</p></> }
          </div>
        </>
      )}
    </div>
  );
};

export default DetailedNews;
