import "./index.less";

import { Button, Drawer, Icon, Toast } from 'antd-mobile';
import React, { Component } from 'react'

import Content from 'app/content';
import Nav from 'app/nav';
import Settings from 'app/settings';
import fetchData from 'libs/fetch';
import getRules from 'libs/filterrules';
import stat from 'libs/stat';

export default class App extends Component {
  state = {
    loading: true,
    data: [],
    selectedIndex: 0,
    open: false,
    filterrules: getRules()
  }
  onOpenChange = e => {

    this.setState({ open: !this.state.open });
  }

  doApplyRules = () => {
    //关闭
    Toast.loading('正在统计...', 0);
    this.doStat();
    Toast.hide();
  }

  doStat() {
    if (this.houseData) {
      window.HouseData = this.houseData;
      let list = stat(this.houseData);
      window.RPTData = list;
      let data = list[this.state.selectedIndex];
      this.setState({
        loading: false,
        list,
        data
      });
    }
  }
  componentDidMount() {
    fetchData("list").then(data => {
      this.houseData = data;
      this.doStat();
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
          dragHandleStyle={{backgroundColor:"rgba(0,0,0,0)"}}
          sidebarStyle={{ border: '0 solid #fff' }}
          sidebar={<Settings doApplyRules={this.doApplyRules} filterRules={this.state.filterrules} />}
          open={this.state.open}
          onOpenChange={this.onOpenChange}>
          <Button className="setting-toggle-btn" onClick={e => { this.onOpenChange() }}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </Button>
          <Content rptdata={this.state.data} />
          <Nav selectedIndex={this.state.selectedIndex} rptdata={this.state.list} onChange={this.onNavBarChange} />
        </Drawer>

    );
  }
}