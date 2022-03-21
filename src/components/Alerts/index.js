import React from 'react';
import ReactDOM from 'react-dom';
import Confirm from './Confirm';
import Alert from './Alert';


const removeAlertContainer = (e) => {
  if(document.getElementById('qoneqo-alert')?.contains(e.target) || e.target.classList.contains('qoneqo-alert')) {return;}
  document.getElementById('qoneqo-alert')?.remove();
}

document.addEventListener('click', removeAlertContainer);


/** 
 * @param {title = String, message = String, confirmed = Function, timeOut = Number} props 
 */

const QConfirm = (props) => {
  document.getElementById('qoneqo-alert')?.remove();

  const a = document.createElement('div');
  a.setAttribute('id', 'qoneqo-alert');
  document.querySelector('body').append(a);

  ReactDOM.render(
    <React.StrictMode>
      <Confirm {...props} />
    </React.StrictMode>,
    document.getElementById('qoneqo-alert')
  );

}


/** 
 * @param {title = String, message = String, timeOut = Number} props 
 */

const QAlert = (props) => {
  document.getElementById('qoneqo-alert')?.remove();

  const a = document.createElement('div');
  a.setAttribute('id', 'qoneqo-alert');
  document.querySelector('body').append(a);

  ReactDOM.render(
    <React.StrictMode>
      <Alert {...props} />
    </React.StrictMode>,
    document.getElementById('qoneqo-alert')
  );
}

export { QConfirm, QAlert }