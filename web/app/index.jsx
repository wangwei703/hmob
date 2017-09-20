import "./index.less";

import { Flex, Icon } from 'antd-mobile';
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import React, { Component } from 'react'

import Community from "app/libs/cfg";
import Content from './layout/content';
import NavBar from './layout/navbar';
import fetchData from 'app/libs/fetch';
import formatData from 'app/libs/formatdata';

export default class App extends Component {
  state = {
    loading: true,
    data: []
  }
  componentDidMount() {
    fetchData("data").then(json => {
      let data = formatData(json);
      window.RPTData = data;
      this.setState({
        loading: false,
        data
      });
    });
  }
  render() {
    return (
      <HashRouter>
        <Flex className="fullscreen layout" direction="column" align="stretch" justify="stretch">
          {
            this.state.loading ?
              <Flex.Item style={{ textAlign: 'center', padding: '1rem' }}><Icon type="loading" size="lg" /></Flex.Item>
              :
              <Content rptdata={this.state.data} />
          }
          <NavBar />
        </Flex>
      </HashRouter>
    );
  }
}