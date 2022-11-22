import { Pagination } from 'react-bootstrap';

const PaginationComp = () => {
  return (
    <div>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </div>
  )
}

export default PaginationComp