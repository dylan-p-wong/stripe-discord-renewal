import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUser }from '../actions/authActions';
import { loadLicenses } from'../actions/licenseActions';
import LicenseHolder from './LicenseHolder';
import InjectCheckoutFrom from './InjectedCheckoutForm';
import FlashMessage from './FlashMessage';
import ReactLoading from 'react-loading';

class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentHidden : true,
            bindHidden: true
        }
    }

    async componentDidMount(){
        await this.props.loadUser();
        
    }

    render() {
        if (!this.props.user ||  this.props.userLoading) return <ReactLoading type={"balls"} color={"white"} height={'20%'} width={'20%'} />;

        return (
            <div className="card">
                <FlashMessage/>
                <h1>Welcome {this.props.user.username}#{this.props.user.discriminator}</h1>
                <p>{this.props.user.email}</p>
                <a href="https://discord.gg/bB5JyWJ" target="_blank">Join Discord</a> 
                <br/>
                <InjectCheckoutFrom stripe={this.props.stripe} user={this.props.user}/>
                <LicenseHolder discordID={this.props.user.id}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user:state.auth.user,
    userLoading: state.auth.isLoading,
    licenseLoading: state.license.isLoading,
});

export default connect(mapStateToProps, { loadUser, loadLicenses })(UserDashboard);