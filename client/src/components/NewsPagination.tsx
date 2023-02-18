import { Pagination } from "antd";

interface PaginationProps {
  pageNo: number;
  total: number;
  handlePageChange: (pageNo: number, pageSize: number) => void;
}

const NewsPagination = ({ pageNo, handlePageChange, total }: PaginationProps) => {
  return (
    <div className="d-flex justify-content-end px-4 mb-4">
      <Pagination showSizeChanger current={pageNo} total={total} onChange={handlePageChange} hideOnSinglePage />
    </div>
  );
};

export default NewsPagination;
