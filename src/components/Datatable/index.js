import React from 'react';
import DatatableClientside from './DatatableClientside';
import DatatableServerside from './DatatableServerside';

const Index = (props) => {
  const { serverside } = props;
  return <>{!serverside ? <DatatableClientside {...props} /> : <DatatableServerside {...props} />}</>;
};

Index.defaultProps = {
  t_head: {},
  t_body: [],
  sortable_fields: {},
  total_data: null,
  pagination: true,
  per_page: 10,
  per_page_list: [10, 15, 25, 50],
  serverside: false,
  order_col: [],
};

export default Index;