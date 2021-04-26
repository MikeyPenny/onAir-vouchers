
import './App.css';
import Layout from './hoc/Layout/Layout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './containers/Auth/Auth';
import Voucher from "./containers/Voucher/Voucher";
import CreateVoucher from './containers/Voucher/CreateVoucher/CreateVoucher';
import Asset from './containers/Assets/Asset';
import {connect} from "react-redux";
import Logout from './containers/Auth/Logout/Logout';

function App(props) {

    const {isAuthenticated} = props;

    let routes = (
        <Switch>
            <Route path="/login" component={Auth} />
            <Route path="/" exact component={Home} />
            <Redirect to="/" />
        </Switch>
    );

    if (isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/logout" component={Logout} />
                <Route path="/voucher" component={Voucher} />
                <Route path="/create" component={CreateVoucher} />
                <Route path="/add-asset" component={Asset} />
                <Route path="/" exact component={Home} />
                <Redirect to="/" />
            </Switch>
        );
    }

    return (
        <div className="App">
            <Layout>
                {routes}
            </Layout>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

export default withRouter(connect(mapStateToProps)(App));
