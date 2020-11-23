import styles from '../styles/Loader.module.css';

const Loader = () => {
  const {loadContainer, loader} = styles;

  return (
    <div className={loadContainer}>
      <div className={loader}></div>
    </div>
  );
};

export default Loader;