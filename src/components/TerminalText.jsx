import { useEffect, useState } from 'react';

const TerminalText = ({ text, speed = 24, className = '', caret = true, delay = 0 }) => {
  const [out, setOut] = useState('');

  useEffect(() => {
    let i = 0;
    let id;
    const start = setTimeout(() => {
      id = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [text, speed, delay]);

  return (
    <span className={`${caret && out.length < text.length ? 'typing-caret' : ''} ${className}`}>
      {out}
    </span>
  );
};

export default TerminalText;
