import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021, 11:17:36AM",
      body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error quas ad beatae itaque quod eligendi autem facere saepe, magni officia nemo, atque magnam ipsum nam.",
    },
    {
      id: 2,
      title: "My Second Post",
      datetime: "July 03, 2021, 11:17:36AM",
      body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error quas ad beatae itaque quod eligendi autem facere saepe, magni officia nemo, atque magnam ipsum nam.",
    },
    {
      id: 3,
      title: "My Third Post",
      datetime: "July 06, 2021, 11:17:36AM",
      body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error quas ad beatae itaque quod eligendi autem facere saepe, magni officia nemo, atque magnam ipsum nam.",
    },
  ]);
  const [search, setSearch] = useState("");
  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/post">
          <NewPost />
        </Route>
        <Route path="/post/:id">
          <PostPage />
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
