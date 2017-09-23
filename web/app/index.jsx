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
    data: [],
    selectedIndex:0
  }
  componentDidMount() {
    fetchData("data").then(json => {
      let list = formatData(json);
      window.RPTData = list;
      let data=list[this.state.selectedIndex];
      this.setState({
        loading: false,
        list,
        data
      });
    });
  }
  onNavBarChange = (selectedIndex, name) => {
    let data = this.state.list[selectedIndex];
    if (data) {
      this.setState({
        data,
        selectedIndex
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
          <Nav selectedIndex={this.state.selectedIndex} rptdata={this.state.list} onChange={this.onNavBarChange} />
        </Flex>
    );
  }
}