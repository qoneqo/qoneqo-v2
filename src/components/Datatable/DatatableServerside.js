import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { AiFillCaretDown, AiFillCaretLeft, AiFillCaretRight, AiFillCaretUp } from 'react-icons/ai';

/**
 * Function to check if sortable_fields is defined or not
 * if not, then init sortable_fields to true for each fields
 * Required params: [props.sortable_fields, props.t_head]
 */
const checkSortableFields = (sortable_fields, order_col) => {
  if (!Object.keys(sortable_fields).length) {
    order_col.forEach((key) => {
      sortable_fields[key] = true
    })
  }
  return sortable_fields;
}

/**
 * Function to init sortList state
 * This sortList state is used for change icon sort in each th element
 * Required params: [props.sortable_fields] after init
 */
const initSortList = (sortable_fields) => {
  let sortList = {};
  Object.entries(sortable_fields).forEach(([key, value]) => {
    if (value === true) {
      sortList[key] = '';
    }
  })
  /**
   * sortList return example
   * {
   *  element: '',
   *  urusan: '',
   *  total: '',
   * };
   */
  return sortList;
}

/**
 * Function to check props total_data
 * If total_data = null then set total tbody equals to tbody.length
 */
const checkTotalData = (total_data, tbody = []) => {
  total_data = (total_data === null) ? tbody.length : total_data;
  return total_data;
}

const DatatableServerside = (props) => {  
  let { t_head, t_format, t_body, sortable_fields, total_data, pagination, pagination_max, pagination_max_current, per_page, base_endpoint, order_col } = props;
  per_page = !per_page ? t_body.length : per_page;
  total_data = checkTotalData(total_data, t_body);
  sortable_fields = checkSortableFields(sortable_fields, order_col);
  const [state, setState] = useState({
    t_body,
    sortList: initSortList(sortable_fields),
    currentPage: 1,
    total_data,
    pagination_max_current,
  });
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      t_body,
      sortList: initSortList(sortable_fields),
      currentPage: 1,
      total_data,
      pagination_max_current,
    }));
  }, [t_head, t_body, sortable_fields, total_data, pagination, pagination_max_current, per_page, base_endpoint, order_col, t_body.length])

  useEffect(() => {
    if (base_endpoint === '') { return; }
    let offset = (state.currentPage - 1) * t_body.length || '';
    let countOrder = Object.values(state.sortList).reduce((calc, val) => ((calc?1:0)+(val?1:0)));
    let order = '';
    /**
     * if single sort
     */
    if (countOrder === 1) {
      let [order_by, order_dir] = Object.entries(state.sortList).find(([key, val]) => (val)) || ['', ''];
      // order = `${order_by && '&order_by='+order_by}${order_dir && '&order_dir='+order_dir}`;
      order = order_by && `&order=${order_by} ${order_dir}`;
    }
    /**
     * if multiple sort
     */
    else if (countOrder > 1) {
      Object.entries(state.sortList).forEach(([key, value]) => {
         order += value && `${key} ${value}, `
      })
      order = order && '&order='+order.slice(0, -2);
    }
      
    axios.get(`${base_endpoint}?${per_page && 'limit='+per_page}${offset && '&offset='+offset}${order}`)
    .then(({data: {widget_data}}) => {   
      setState((prev) => ({
        ...prev,
        t_body: widget_data.t_body,
        total_data: widget_data.total_data,
      }));
    })
    .catch(() => {})
  }, [state.currentPage, state.sortList, base_endpoint, per_page, t_body.length])

  const handleOrder = (key, event) => {
    let orderDir = '';
    let tempSortList = {};
    switch (state.sortList[key]) {
      case '': orderDir = 'asc'; break;
      case 'asc': orderDir = 'desc'; break;    
      default: orderDir = ''; break;
    }
    /**
     * if shite + click
     */
    if (event.shiftKey) {
      tempSortList = state.sortList;
      delete tempSortList[key];
      tempSortList[key] = orderDir;
      setState((prev) => ({
        ...prev,
        sortList: {
          ...tempSortList,
        },
      }))
    } else {
      tempSortList = initSortList(sortable_fields);
      delete tempSortList[key];
      tempSortList[key] = orderDir;
      setState((prev) => ({
        ...prev,
        sortList: {
          ...tempSortList,
        },
      }))
    }
  }

  const handleClickPagination = (page) => {
    switch (page) {
      case 'prev':
        if (state.currentPage <= 1) {return;}
        setState((prev) => ({
          ...prev,
          currentPage: Number(prev.currentPage)-1,
          pagination_max_current: Number(prev.currentPage-1) < prev.pagination_max_current ? Number(prev.currentPage) - pagination_max : prev.pagination_max_current,          
        }))        
        break;
      case 'next':
        if (state.currentPage+1 > Math.ceil(state.total_data/per_page)) {return;}
        setState((prev) => ({
          ...prev,
          currentPage: Number(prev.currentPage)+1,
          pagination_max_current: Number(prev.currentPage+1) >= prev.pagination_max_current + pagination_max ? Number(prev.currentPage)+1 : prev.pagination_max_current,          
        }))
        break;
      case 'prev...':
        setState(prev => ({
          ...prev, 
          currentPage: prev.pagination_max_current - pagination_max, 
          pagination_max_current: prev.pagination_max_current - pagination_max,          
        }))
        break;
      case 'next...':
        setState(prev => ({
          ...prev, 
          currentPage: prev.pagination_max_current + pagination_max, 
          pagination_max_current: prev.pagination_max_current + pagination_max,          
        }))
        break;
      case 'first':
        setState((prev) => ({
          ...prev,
          currentPage: 1,          
          pagination_max_current: 1,
        }))
        break;
      case 'last':
        setState((prev) => ({
          ...prev,
          currentPage: Math.ceil(state.total_data/per_page),          
          pagination_max_current: Math.ceil(state.total_data/per_page) + 1 - ((Math.ceil(state.total_data/per_page) % pagination_max) ? (Math.ceil(state.total_data/per_page) % pagination_max) : pagination_max),
        }))
        break;
      default:
        setState((prev) => ({
          ...prev,
          currentPage: Number(page),
        }))
        break;
    }
  }

  
  return (
    <>
      <div className={`my-3 overflow-x-auto`}>
        <table className={`w-full bg-white`}>
          <thead>
            <tr>
              {order_col.map((key) => (
                <th className={`p-2 font-normal text-sm text-[#373737] border-b border-b-[#D2D2D2] text-left`} key={key}>
                  <div className={`flex relative cursor-pointer`} onClick={(event) => { handleOrder(key, event) }}>
                    <span className="mr-2">{t_head[key]}</span> 
                    <span className={`ml-2 ${(sortable_fields[key] === false || t_format[key]) && 'hidden'}`}>
                      <AiFillCaretUp className={`fa fa-caret-up absolute text-[#D2D2D2] top-[-1px] right-0 ${state.sortList[key] === 'desc' && 'hidden'}`} />
                      <AiFillCaretDown className={`fa fa-caret-down absolute text-[#D2D2D2] bottom-[-1px] right-0 ${state.sortList[key] === 'asc' && 'hidden'}`} />
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              state.t_body?.map((row, index) => (
                <tr className={`odd:bg-[#F9F9FB]`} key={index+ Math.random()}>
                  {
                    order_col.map((key) => (
                      <td className={`p-2 font-normal text-sm text-[#373737] border-b border-b-[#E8E8E8]`} key={key+'-'+index+'-'+Math.random()}>{ t_format[key] ? t_format[key](row) : row[key]}</td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
        
        { (pagination && per_page && t_body.length !== 0 && Math.ceil(state.total_data/per_page) > 1) && 
          <div className={`my-2 text-right`}>
            <span onClick={() => {handleClickPagination('prev')}} className={`cursor-pointer border border-[#797979] w-6 h-6 inline-block text-center text-sm ${state.currentPage === 1 && 'cursor-not-allowed text-[#A6A6A6]'}`}><AiFillCaretLeft className={`inline-block`} /></span>
            {
              <span key={`page-first`} 
              onClick={() => { handleClickPagination('first');  }} 
              className={`cursor-pointer border border-[#797979] px-2 h-6 inline-block text-center text-sm ${state.currentPage === 1 && 'bg-[#3989DA] text-white'}`}
              >1</span>
            }
            { (state.currentPage > pagination_max) &&
              <span key={`page-prev-...`} 
              className={`cursor-pointer border border-[#797979] w-6 h-6 inline-block text-center text-sm`}
              onClick={() => { handleClickPagination('prev...') }}
              >...</span>
            }
            {
              Array.from({length: Math.ceil(state.total_data/per_page) < pagination_max ? Math.ceil(state.total_data/per_page) : pagination_max}, (_, i) => i+ state.pagination_max_current).map((val) => (
                (val > 1 && val < Math.ceil(state.total_data/per_page)) &&
                <span key={`page-${val}`} 
                onClick={() => {handleClickPagination(val)}} 
                className={`cursor-pointer border border-[#797979] w-6 h-6 inline-block text-center text-sm ${state.currentPage === val && 'bg-[#3989DA] text-white'}`}
                >{val}</span>
              ))              
            }
            { (state.pagination_max_current <= Math.ceil(state.total_data/per_page) - pagination_max  && Math.ceil(state.total_data/per_page) > pagination_max) &&
              <span key={`page-next-...`} 
              className={`cursor-pointer border border-[#797979] w-6 h-6 inline-block text-center text-sm`}
              onClick={() => { handleClickPagination('next...') }}
              >...</span>
            }
            {
              <span key={`page-last`} 
              onClick={() => { handleClickPagination('last');  }} 
              className={`cursor-pointer border border-[#797979] px-2 h-6 inline-block text-center text-sm ${state.currentPage === Math.ceil(state.total_data/per_page) && 'bg-[#3989DA] text-white'}`}
              >{Math.ceil(state.total_data/per_page)}</span>
            }
            <span onClick={() => {handleClickPagination('next')}} className={`cursor-pointer border border-[#797979] w-6 h-6 inline-block text-center text-sm ${state.currentPage === Math.ceil(state.total_data/per_page) && 'cursor-not-allowed text-[#A6A6A6]'}`}><AiFillCaretRight className={`inline-block`} /></span>
          </div>
        }

      </div>
    </>
  );
};

DatatableServerside.defaultProps = {
  t_head: {},
  t_body: [],
  t_format: {},
  sortable_fields: {},
  total_data: null,
  pagination: true,
  pagination_max: 5,
  pagination_max_current: 1,
  per_page: 10,
  per_page_list: [10,15,25,50],
  base_endpoint: '',
  order_col: [],
};

export default DatatableServerside;
