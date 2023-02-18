import React, {useState } from "react";
import {  DownOutlined } from "@ant-design/icons";
import { Layout, Input, Dropdown, Button } from "antd";
//Helper
import { getItems } from "./helper";
const { Search } = Input;
const { Header } = Layout;

const NewsNav = ({ token, searchText, setSearchText, sources, setSources, resetPagination }: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle = {
    boxShadow: "none",
  };

  const onSourcesChange = (item: string) => {
    const index = sources.indexOf(item);
    if (index === -1) setSources((prev : any) => [...prev, item]);
    else {
      setSources((prev : any) => {
        const updatedSources = [...prev];
        updatedSources.splice(index, 1);
        return updatedSources;
      });
    }
    resetPagination();
  };
  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    resetPagination();
  }

  const onSearch = (value:string) => {
    setSearchText(value);
  }
  return (
    <Header className="header">
      <div className="h-100 d-flex align-items-center">
        <h2 className="text-white mb-0 me-4">News Feedly</h2>
        <Search
          placeholder="Search News"
          allowClear
          enterButton="Search"
          size="large"
          value={search}
          onChange={handleSearchChange}
          className="w-auto mb-0 me-3"
          onSearch={onSearch}
        />
        <Dropdown
          open={isDropdownOpen}
          onOpenChange={(open) => setIsDropdownOpen(open)}
          menu={{ items: getItems(onSourcesChange, sources) }}
          dropdownRender={(menu) => (
            <div style={contentStyle}>{React.cloneElement(menu as React.ReactElement, { style: menuStyle })}</div>
          )}
        >
          <Button className="d-flex align-items-center">
            Sources
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default NewsNav;
