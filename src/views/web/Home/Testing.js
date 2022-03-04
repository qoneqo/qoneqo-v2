import React, {useState, useEffect} from 'react'
import axios from 'axios';

const Testing = () => {
  const [state, setState] = useState([]);
  useEffect(() => {
    var bodyFormData = new FormData();
    bodyFormData.append('_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjY4MTUzMSwidW5hbWUiOiJ1c2VyX3BheWFrdW1idWgifQ.5S8FW3NwEJQ9Ej3_19-37xlcxDsCTpEdgdr-_xTgHsc');
    bodyFormData.append('topics[]', '1430');
    bodyFormData.append('topics[]', '1431');
    bodyFormData.append('sentiment[]', '1');
    bodyFormData.append('sentiment[]', '2');
    bodyFormData.append('daterange', '2022-02-11 - 2022-02-17');
    axios.post('https://demo.bigbox.co.id/bigbox/api/bigsocial/twitter/per_topic/type/trendline', bodyFormData)
    .then(({data: {data}}) => {
      console.log(data);
      setState(data);
    })
    .catch(() => {})
  }, []);

  return (
    <>
      <div>Testing</div>
      <pre>
        { JSON.stringify(state, undefined, 2) }
      </pre>
    </>
  )
}

export default Testing