import React, { useContext, useState } from "react";
import Header from "../Header/Header";
import Content from "../Content/Content";
import Search from "../Search/Search";
import axios from "axios";
import NavigationContext from "../context/NavigationContext";
import Mailboxes from "../Mailboxes/Mailboxes";

export default function Layout(props) {
  const [searchResult, setSearchResult] = useState([]);
  const [navigation, setNavigation] = useState("inbox");
  const [previousNavigation, setPreviousNavigation] = useState("inbox")

  const handleSearch = async (text) => {
    const authToken = localStorage.getItem('token')
    try {
      const response = await axios.get(
        "http://localhost:3000/massages/search" ,
        {
          params: {
            text: text,
          },
            headers:{
              Authorization: `Bearer ${authToken}` 
            }
        }
      );
      if (!response.data) {
        throw new Error("Search request failed");
      }

  
console.log(response.data);
      setSearchResult(response.data);
      if (!text.trim()) {
        setNavigation(previousNavigation);
      } else {
        setPreviousNavigation(navigation);
        setNavigation("search");
      }
    } catch (error) {
      console.error("Error during search:", error.message);
    }
  };

  return (
    <div>
      <NavigationContext.Provider value={{ navigation, setNavigation }}>
        <Header handleSearch={handleSearch} />
        <Content searchResult={searchResult} />
        {/* <Mailboxes  searchResult={searchResult}/> */}
      </NavigationContext.Provider>
    </div>
  );
}
