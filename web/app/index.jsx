import "./index.less";

import { Button, Drawer, Flex, Icon } from 'antd-mobile';
import React, { Component } from 'react'

import Content from 'app/content';
import Nav from 'app/nav';
import Settings from 'app/settings';
import fetchData from 'libs/fetch';
import formatData from 'libs/formatdata';

export default class App extends Component {
  state = {
    loading: true,
    data: [],
    selectedIndex: 0,
    open: true
  }
  onDrawerToggle = e => {
    console.log(e);
    // this.setState({ open: !this.state.open });
  }
  onOpenChange = open => {
    if (typeof open !== "boolean") {
      open = !this.state.open;
    }
    this.setState({ open: !!open });
  }
  componentDidMount() {
    fetchData("data").then(json => {
      let list = formatData(json);
      window.RPTData = list;
      let data = list[this.state.selectedIndex];
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
        <Drawer
          className="settings-panel"
          position="right"
          enableDragHandle
          sidebar={<Settings doOpenChange={this.onOpenChange} />}
          open={this.state.open}
          onOpenChange={this.onDrawerToggle}>
          <Button className="setting-toggle-btn" onClick={e => { this.onOpenChange() }}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </Button>
          <Flex direction="column" justify="stretch" align="stretch" className="layout">
            <Content rptdata={this.state.data} />
            <Nav selectedIndex={this.state.selectedIndex} rptdata={this.state.list} onChange={this.onNavBarChange} />
          </Flex>
        </Drawer>

    );
  }
}