import React, { useState } from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import ArticlesList from "./Components/Articles/ArticlesList";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ArticleDetails from "./Components/Articles/ArticleDetails";
import Login from "./Components/Login/Login";
import Registration from "./Components/Registration/Registration";
import NewArticle from "./Components/Articles/NewArticle";
import Navbar from "./Components/Navbar/NavBar";
import Profile from "./Components/Profile/Profile";
import UserEdit from "./Components/Profile/UserEdit";

export const UserStatusContext = React.createContext({});
const App: React.FC = () => {
    const [userStatus, setUserStatus] = useState(
        !!localStorage.getItem("username")
    );

    return (
        <BrowserRouter>
            <div className="App">
                <UserStatusContext.Provider value={[userStatus, setUserStatus]}>
                    <header className="header">
                        <Navbar />
                    </header>
                    <main className="main">
                        <Switch>
                            <Route path="/" exact component={Home} />

                            <Route
                                path="/articles"
                                exact
                                component={ArticlesList}
                            />
                            <Route
                                path="/articles/new"
                                component={NewArticle}
                            />
                            <Route
                                path="/articles/:id/edit"
                                component={NewArticle}
                            />
                            <Route
                                path="/articles/:id"
                                component={ArticleDetails}
                            />

                            <Route path="/login" component={Login} />
                            <Route
                                path="/registration"
                                component={Registration}
                            />

                            <Route
                                path="/user/articles"
                                component={ArticlesList}
                            />
                            <Route path="/user/edit" component={UserEdit} />
                            <Route path="/user" component={Profile} />
                        </Switch>
                    </main>
                </UserStatusContext.Provider>
            </div>
        </BrowserRouter>
    );
};

export default App;
