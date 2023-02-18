import { Layout, Card, Typography, Skeleton } from "antd";
const { Meta } = Card;
const { Paragraph } = Typography;
const { Content } = Layout;

const NewsContent = ({ token, news, loading }: any) => {
  const { colorBgContainer } = token;
  return (
    <Layout>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <div className="row">
            {(!loading ? news : new Array(10).fill("")).map((item: any, index:number) => (
              <div key={item["_id"]} className="col-sm-4 mb-4">
                {loading ? (
                   <Card key={index}><Skeleton active /><Skeleton active /></Card>
                ) : (
                  <Card
                    className="h-100"
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src={item.urlToImage || `/images/dummy.png`}
                        style={{ height: "380px" }}
                        onError={(e: any) => (e.target.src = `/images/dummy.png`)}
                      />
                    }
                    onClick={() => window.open(item.url, "_blank")}
                  >
                    <Meta
                      title={item.title}
                      description={
                        <div>
                          <div>Published at {item.publishedAt.slice(0, 10)}</div>
                          <div>Source : {item.source.name}</div>
                        </div>
                      }
                      className="mb-2"
                    />
                    <Paragraph ellipsis={{ rows: 2, expandable: false }}>{item.description}</Paragraph>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default NewsContent;
