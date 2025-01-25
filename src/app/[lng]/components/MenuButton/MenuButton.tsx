import type IMenuButton from './IMenuButton';

import styles from './sass/MenuButton.module.scss';

function MenuButton({ onClick }: IMenuButton) {
  return (
    <button
      className={styles.container}
      onClick={onClick}
      type="button"
      aria-label="Menu"
    >
      <span className={styles.lineBurger} />
      <span className={styles.lineBurger} />
    </button>
  );
}

export default MenuButton;
