import React, { useState } from "react";
import "./App.css";
import NavBar from "./Comoponents/MainPage/NavBar";
import MainSection from "./Comoponents/MainPage/MainSection";
import ArticlesList from "./Comoponents/Articles/ArticlesList";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ArticleDetails from "./Comoponents/Articles/ArticleDetails";
import Login from "./Comoponents/Login/Login";
import Registration from "./Comoponents/Registration/Registration";
import RegisteredUserMeny from "./Comoponents/Meny/RegisteredUserMeny";
import NewArticle from "./Comoponents/Articles/NewArticle";

export const UserStatusContext = React.createContext({});
const App: React.FC = () => {
    const [userStatus, setUserStatus] = useState(
        !!localStorage.getItem("username")
    );

    return (
        <BrowserRouter>
            <div className="App">
                <UserStatusContext.Provider value={[userStatus, setUserStatus]}>
                    <NavBar />
                    <Switch>
                        <Route path="/" exact component={MainSection} />
                        <Route
                            path="/articlelist"
                            exact
                            component={ArticlesList}
                        />
                        <Route path="/search/:id" component={ArticlesList} />
                        <Route
                            path="/articlelist/myarticles"
                            component={ArticlesList}
                        />
                        <Route
                            path="/articlelist/:id"
                            component={ArticleDetails}
                        />
                        <Route path="/login" component={Login} />
                        <Route path="/Registration" component={Registration} />
                        <Route
                            path="/usermeny"
                            component={RegisteredUserMeny}
                        />
                        <Route path="/NewArticle" component={NewArticle} />
                    </Switch>
                </UserStatusContext.Provider>
            </div>
        </BrowserRouter>
    );
};

export default App;
