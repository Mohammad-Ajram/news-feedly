import React, { useCallback, useEffect, useState } from "react";
import { Layout, theme } from "antd";
import NewsNav from "./NewsNav";
import NewsContent from "./NewsContent";
import NewsPagination from "./NewsPagination";
import NoDataComponent from "./NoDataComponent";
//API
import { getNewsApiCall } from "../api";

const News: React.FC = () => {
  const [news, setNews] = useState<[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [sources, setSources] = useState([]);
  const [paginationDetails, setPaginationDetails] = useState({
    pageNo: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const resetPagination = () => {
    setPaginationDetails({
      pageNo: 1,
      pageSize: 10,
      total: 0,
    });
  };
  const { token } = theme.useToken();

  const getNewsApiCallback = useCallback(
    (pageNo: number, pageSize: number) => {
      let params = new URLSearchParams();
      params.append("pageNo", String(pageNo));
      params.append("pageSize", String(pageSize));
      if (searchText) params.append("search", searchText);
      if (sources.length > 0) {
        sources.forEach((item) => params.append("source", item));
      }
      setLoading(true);
      getNewsApiCall({ params })
        .then((res: any) => {
          const { news, total } = res.data;
          setPaginationDetails((prev) => ({ ...prev, total }));
          setNews(news);
          setLoading(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch((err: any) => console.log(err));
    },
    [sources, searchText]
  );

  useEffect(() => {
    getNewsApiCallback(1, 10);
  }, [getNewsApiCallback]);

  const handlePageChange = (pageNo: number, pageSize: number) => {
    setPaginationDetails((prev) => ({ ...prev, pageNo, pageSize }));
    getNewsApiCallback(pageNo, pageSize);
  };

  const { pageNo, total } = paginationDetails;
  return (
    <Layout>
      <NewsNav
        token={token}
        searchText={searchText}
        setSearchText={setSearchText}
        sources={sources}
        setSources={setSources}
        resetPagination={resetPagination}
      />
      {news.length === 0 && !loading ? (
        <NoDataComponent />
      ) : (
        <NewsContent token={token} news={news} loading={loading} />
      )}
      {news.length > 0 && <NewsPagination pageNo={pageNo} total={total} handlePageChange={handlePageChange} />}
    </Layout>
  );
};

export default News;
