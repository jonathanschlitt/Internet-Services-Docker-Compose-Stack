import PropTypes from 'prop-types'; //impt shortcut

import Button from './Button';

const Header = ({ title, onAdd, showAddTask }) => {
  return (
    <header className="my-5 max-w-2xl mx-auto">
      <div className="flex justify-between p-4">
        <h1 className="text-4xl font-bold text-center">{title}</h1>

        <Button text={!showAddTask ? `Add` : `Hide`} onClick={onAdd} />
      </div>
    </header>
  );
};

Header.defaultProps = {
  title: 'Task Tracker',
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
