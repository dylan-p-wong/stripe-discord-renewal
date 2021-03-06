import React, { Component } from 'react';
import { loadLicenses } from'../actions/licenseActions';
import { connect } from 'react-redux';
import License from './License';
import ReactLoading from 'react-loading';

class LicenseHolder extends Component {
    componentDidMount(){
        this.props.loadLicenses(this.props.discordID);
    }

    render() {
        if (!this.props.licenses) return (
            <div>
                <h1>Licenses</h1>
                <ReactLoading type={"spinningBubbles"} color={"white"} height={'20%'} width={'20%'} className="loading"/>
            </div>
        )

        const licenses = this.props.licenses.map((item) => {
            return <License key={item._id} license={item}></License>
        });

        return (
            <div>
                <h1>Licenses</h1>
                {this.props.licenses.length === 0 ? "You have no licenses!": <p>{licenses}</p>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    licenses:state.license.licenses
});

export default connect(mapStateToProps, {loadLicenses})(LicenseHolder);