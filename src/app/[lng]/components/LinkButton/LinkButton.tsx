import LinkComponent from '../Link/Link';

import type IButton from './interfaces/IButton';

import styles from './sass/button.module.scss';

function LinkButton({
  text, id, path,
}: IButton) {
  return (
    <LinkComponent
      id={id}
      className={styles.container}
      href={path ?? '/'}
    >
      <span className={styles.textContainer}>
        {text.split('').map((char, index) => {
          let item = (
            <span key={[index, char].join('_')}>{char}</span>
          );
          if (char === ' ' || !char) {
            item = (
              <span key={[index, char].join('_')}>&nbsp;</span>
            );
          }
          return item;
        })}
      </span>
    </LinkComponent>
  );
}

export default LinkButton;
