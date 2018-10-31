import React, { Component } from "react";
import HeaderButton from './header-button';

export default class Header extends Component {
  render() {
    return (
    <div style={layout}>
        <HeaderButton/>
    </div>
    );
  }
}

const layout = {
    marginTop: 8,
    marginBottom: -8
}

