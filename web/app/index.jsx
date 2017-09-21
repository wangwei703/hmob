import "./index.less";

import { Flex, Icon } from 'antd-mobile';
import React, { Component } from 'react'

import Content from 'app/content';
import Nav from 'app/nav';
import fetchData from 'libs/fetch';
import formatData from 'libs/formatdata';

export default class App extends Component {
  state = {
    loading: true,
    data: []
  }
  componentDidMount() {
    fetchData("data").then(json => {
      let list = formatData(json);
      window.RPTData = list;
      this.setState({
        loading: false,
        list,
        data: list[0]
      });
    });
  }
  onNavBarChange = data => {
    if (data) {
      this.setState({
        data
      })
    }
  }
  render() {
    return (
      this.state.loading ?
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <Icon type="loading" size="lg" />
        </div>
        :
        <Flex direction="column" justify="stretch" align="stretch" className="layout">
          <Content rptdata={this.state.data} />
          <Nav activeIndex={0} rptdata={this.state.list} onChange={this.onNavBarChange} />
        </Flex>
    );
  }
}