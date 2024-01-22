import React, { useContext, useState } from "react";
import Header from "../Header/Header";
import Content from "../Content/Content";
import Search from "../Search/Search";
import axios from "axios";
import NavigationContext from "../context/NavigationContext";

export default function Layout(props) {
  const [searchResult, setSearchResult] = useState([]);
  const [navigation, setNavigation] = useState("inbox");


  const handleSearch = async (text) => {
    const userEmail = "jane.smith@gmail.com";
    try {
      const response = await axios.get(
        "http://localhost:3000/massages/search/" + userEmail,
        {
          params: {
            text: text,
          },
        }
      );
      if (!response.data) {
        throw new Error("Search request failed");
      }

      const filterEmail = response.data.filter((email) =>
        email.massageBody.toLowerCase().includes(text.toLowerCase())
      );

      setSearchResult(filterEmail);
      setNavigation("search");

      // return searchResult
    } catch (error) {
      console.error("Error during search:", error.message);
    } finally {
      if (!text.trim()) {
        setSearchResult([]);
      }
    }
  };

  return (
    <div>
      <NavigationContext.Provider value={{ navigation, setNavigation }}>
        <Header handleSearch={handleSearch} />
        <Content searchResult={searchResult} />
      </NavigationContext.Provider>
    </div>
  );
}
