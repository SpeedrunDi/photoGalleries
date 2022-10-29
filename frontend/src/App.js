import {Route, Switch} from "react-router-dom";
import {Typography} from "@mui/material";
import Layout from "./components/UI/Layout/Layout";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

const App = () => (
  <Layout>
    <Switch>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
      <Route path="*" render={() => <Typography variant="h1" textAlign="center">Not found!</Typography>}/>
    </Switch>
  </Layout>
);

export default App;
