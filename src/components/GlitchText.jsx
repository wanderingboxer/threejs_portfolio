const GlitchText = ({ text, as: Tag = 'span', className = '' }) => {
  return (
    <Tag className={`glitch ${className}`} data-text={text}>
      {text}
    </Tag>
  );
};

export default GlitchText;
