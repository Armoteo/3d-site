import styles from './sass/Preloader.module.scss';

function Preloader() {
  return (
    <div className={styles.container}>
      <div className={styles.loader} />
    </div>
  );
}

export default Preloader;
