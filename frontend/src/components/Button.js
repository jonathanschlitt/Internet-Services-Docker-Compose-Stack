import PropTypes from 'prop-types';

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 bg-green-700 text-white font-semibold rounded hover:bg-yellow-400"
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
