import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import api from "../api/posts";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const history = useHistory();

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      history.push("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        posts,
        setPosts,
        handleEdit,
        editBody,
        setEditBody,
        editTitle,
        setEditTitle,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
