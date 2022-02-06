import React, {useState, useEffect} from 'react';
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

/**
 * Function to init data
 * data is used to display in table while t_body is saved in memory
 */
const initData = (t_body, per_page) => {
  return t_body.filter((value, index) => (
    index < per_page
  ))
}

/**
 * Function to filter data by currentPage & data.length
 */
const FilterData = (t_body, currentPage, per_page) => {
  return t_body.filter((value, index) => (
    (index > ((currentPage-1) * per_page) - 1) && (index < (currentPage * per_page))
  ))
}

/**
 * Sort Data Function
 */
const sortTBody = (t_body = [], sortList, original_t_body = []) => {
  /**
   * a-b = asc
   * b-a = desc
   */
  let valid = Object.values(sortList).some((val) => (val !== ''))
  if (!valid ) { return original_t_body.slice(); }
  const result = t_body.sort((a, b) => {    
    let tempSort;
    Object.entries(sortList).forEach(([key, value]) => {
      if('value' === '') {return;}
      if (value === 'asc') {
        if (isNaN(a[key])) {
          tempSort = tempSort || String(a[key]).localeCompare(b[key]);
        } else {
          tempSort = tempSort || a[key] - b[key];
        }
      } else if (value === 'desc') {
        if (isNaN(a[key])) {
          tempSort = tempSort || String(b[key]).localeCompare(a[key]);
        } else {
          tempSort = tempSort || b[key] - a[key];
        }
      }
    })
    return tempSort;
  });
  return result;
} 
const DatatableClientside = (props) => {
  let { t_head, t_body, sortable_fields, total_data, pagination, pagination_max, pagination_max_current, per_page, order_col } = props;
  per_page = !per_page ? t_body.length : per_page;
  total_data = checkTotalData(total_data, t_body);
  sortable_fields = checkSortableFields(sortable_fields, order_col);
  
  // sortable_fields = {element: true, urusan: false, total: true}
  const [state, setState] = useState({
    t_body,
    original_t_body: t_body.slice(),
    data: initData(t_body, per_page),
    sortList: initSortList(sortable_fields),
    currentPage: 1,
    total_data,
    pagination_max_current,
  });
  useEffect(() => {
    setState((prev) => ({
      t_body,
      original_t_body: t_body.slice(),
      data: initData(t_body, per_page),
      sortList: initSortList(sortable_fields),
      currentPage: 1,
      total_data,
      pagination_max_current,
    }))
  }, [t_head, t_body, sortable_fields, total_data, pagination, pagination_max_current, per_page, order_col])

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
        t_body: sortTBody(prev.t_body, tempSortList, prev.original_t_body),
        data: FilterData(sortTBody(prev.t_body, tempSortList, prev.original_t_body), Number(prev.currentPage), per_page),
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
        t_body: sortTBody(prev.t_body, tempSortList, prev.original_t_body),
        data: FilterData(sortTBody(prev.t_body, tempSortList, prev.original_t_body), Number(prev.currentPage), per_page),
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
          data: FilterData(prev.t_body, Number(prev.currentPage)-1, per_page),
        }))        
        break;
      case 'next':
        if (state.currentPage+1 > Math.ceil(state.t_body.length/per_page)) {return;}
        setState((prev) => ({
          ...prev,
          currentPage: Number(prev.currentPage)+1,
          pagination_max_current: Number(prev.currentPage+1) >= prev.pagination_max_current + pagination_max ? Number(prev.currentPage)+1 : prev.pagination_max_current,
          data: FilterData(prev.t_body, Number(prev.currentPage)+1, per_page),
        }))
        break;
      case 'prev...':
        setState(prev => ({
          ...prev, 
          currentPage: prev.pagination_max_current - pagination_max, 
          pagination_max_current: prev.pagination_max_current - pagination_max,
          data: FilterData(prev.t_body, prev.pagination_max_current - pagination_max, per_page),
        }))
        break;
      case 'next...':
        setState(prev => ({
          ...prev, 
          currentPage: prev.pagination_max_current + pagination_max, 
          pagination_max_current: prev.pagination_max_current + pagination_max,
          data: FilterData(prev.t_body, prev.pagination_max_current + pagination_max, per_page),
        }))
        break;
      case 'first':
        setState((prev) => ({
          ...prev,
          currentPage: 1,
          data: FilterData(prev.t_body, 1, per_page),
          pagination_max_current: 1,
        }))
        break;
      case 'last':
        setState((prev) => ({
          ...prev,
          currentPage: Math.ceil(state.total_data/per_page),
          data: FilterData(prev.t_body, Math.ceil(state.total_data/per_page), per_page),
          pagination_max_current: Math.ceil(state.total_data/per_page) + 1 - ((Math.ceil(state.total_data/per_page) % pagination_max) ? (Math.ceil(state.total_data/per_page) % pagination_max) : pagination_max),
        }))
        break;
      default:
        setState((prev) => ({
          ...prev,
          currentPage: Number(page),
          data: FilterData(prev.t_body, Number(page), per_page),
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
                    <span className={`ml-2 ${sortable_fields[key] === false && 'hidden'}`}>
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
              state.data?.map((row, index) => (
                <tr className={`odd:bg-[#F9F9FB]`} key={index}>
                  {
                    order_col.map((key) => (
                      <td className={`p-2 font-normal text-sm text-[#373737] border-b border-b-[#E8E8E8]`} key={key}>{row[key]}</td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
        
        { (pagination && t_body.length > per_page) && 
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

DatatableClientside.defaultProps = {
  t_head: {},
  t_body: [],
  sortable_fields: {},
  total_data: null,
  pagination: true,
  pagination_max: 5,
  pagination_max_current: 1,
  per_page: 10,
  per_page_list: [10,15,25,50],
  order_col: [],
};

export default DatatableClientside;
