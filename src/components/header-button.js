import React, { Component } from "react";
import { Avatar } from 'antd';

export default class HeaderButton extends Component {
  render() {
    return (
    <div style={layout}>
        <a style={{ color: "white", marginRight: 5 }} href="https://github.com/otaviojulianons/DynamicRestApi" target="_blank">
            View on Github
            <Avatar shape="logo-avatar" style={{ float: "right"}} size={24} src="./images/github-logo.png" shape="square"/>
        </a>
    </div>
    );
  }
}

const layout = {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: -8,
    display: "inline-block",
    float: "right"
}

