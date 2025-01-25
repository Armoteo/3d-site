import ImageComponent from '../Image/Image';

import type { IItem } from './interfaces/ILangSelector';

import styles from './sass/LangSelector.module.scss';

function LangItem({ item }: IItem) {
  return (
    <div className={styles.item}>
      <div className={styles.imageWrapper}>
        <ImageComponent
          src={item.icon}
          alt="image"
          fill
        />
      </div>
      <span className={styles.langText}>{item.code}</span>
    </div>
  );
}

export default LangItem;
