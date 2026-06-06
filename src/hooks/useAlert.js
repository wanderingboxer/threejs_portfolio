import { useState } from 'react';

const useAlert = () => {
  const [alert, setAlert] = useState({ show: false, text: '', type: 'danger' });

  const showAlert = (input) => {
    if (typeof input === 'string') {
      setAlert({ show: true, text: input, type: 'success' });
    } else {
      const { text, message, type = 'danger' } = input || {};
      setAlert({ show: true, text: text || message || '', type });
    }
    setTimeout(() => setAlert({ show: false, text: '', type: 'danger' }), 3500);
  };
  const hideAlert = () => setAlert({ show: false, text: '', type: 'danger' });

  return { alert, showAlert, hideAlert };
};

export default useAlert;
