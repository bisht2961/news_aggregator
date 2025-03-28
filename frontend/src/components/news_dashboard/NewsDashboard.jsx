import React, { useEffect, useState } from "react";
import Menu from "../menu/Menu";
import NewsGrid from "../news_grid/NewsGrid";
import { useDispatch, useSelector } from "react-redux";
import "./NewsDashboard.css";
import { loadEveryNews } from "../../store/actions/newsAction";
import { resetNews } from "../../slices/news/newsSlice";
import Header from "../header/Header";

const NewsDashboard = () => {

  const dispatch = useDispatch();
  const {list, page} = useSelector((state) => state.news);
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState("general");
  const pageSize = 10;

  useEffect(() => {
    console.log("Category: ", category);
    dispatch(resetNews());
    fetchMoreNews();
  }, []);

  const fetchMoreNews = () => {
    const data = {
      page: page,
      page_size: pageSize,
      news_preference: category,
    };
    dispatch(loadEveryNews(data));
  }
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop >=
  //         document.documentElement.offsetHeight - 100 &&
  //       !isLoading &&
  //       hasMore
  //     ) {
  //       fetchMoreNews();
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  // }, [isLoading, hasMore]);
  
  const onClickMenuItem = (id, value) => {
    setActive(id);
    setCategory(value);
  };

  return (
    <div className="news_dashboard">
      <Header />
      {list === undefined ? (
        <>
          <h1>Loading....</h1>
        </>
      ) : (
        <>
          <Menu onClickMenuItem={onClickMenuItem} active={active} />
          {list.length === 0 ? (
            <>
              <h1>No News found</h1>
            </>
          ) : (
            <NewsGrid items={list} />
          )}
        </>
      )}
    </div>
  );
};

export default NewsDashboard;
