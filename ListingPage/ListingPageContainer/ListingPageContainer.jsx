import React, { useRef, useEffect, useState } from "react";
import ListigPageComponent from "../ListingPageComponent/ListigPageComponent";
import axios from "axios";

function ListingPageContainer(props) {
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [userList, setUserList] = useState([]);
  const [lastList, setLastList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.instantwebtools.net/v1/passenger?page=${currPage}&size=5`
      );
      console.log(response.data.data, "<<<");
      if (!response.data.data.length) {
        setLastList(true);
        return;
      }
      setPrevPage(currPage);
      setUserList([...userList, ...response.data.data]);
    };
    if (!lastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, lastList, prevPage, userList]);

  const onScroll = () => {
    console.log(listInnerRef.current);
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      console.log(scrollTop + clientHeight, scrollHeight);

      if (Math.round(scrollTop + clientHeight) === scrollHeight) {
        console.log("nnn");
        setCurrPage(currPage + 1);
      }
    }
  };

  return (
    <ListigPageComponent
      onScroll={onScroll}
      listInnerRef={listInnerRef}
      userList={userList}
    />
  );
}

export default ListingPageContainer;
