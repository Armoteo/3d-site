import { useParams } from 'next/navigation';

import LangMenuList from '../../../../constants/langList';
import ImageComponent from '../Image/Image';
import LangSelector from '../LangSelector/LangSelector';
import LinkComponent from '../Link/Link';
import LinkButton from '../LinkButton/LinkButton';
import MenuButton from '../MenuButton/MenuButton';

import styles from './sass/Header.module.scss';

import useTranslation from '@/i18n/client';

function Header() {
  const { lng } = useParams();
  const { t } = useTranslation(lng, 'common');

  return (
    <div className={styles.container}>
      <LinkComponent href="/" ariaLabel="logo">
        <ImageComponent
          className={styles.image}
          src="/img_Logo.webp"
          alt="image"
          width={117}
          height={38}
        />
      </LinkComponent>
      <div className={styles.buttonsWrapper}>
        <LangSelector list={LangMenuList} />
        <MenuButton onClick={() => {}} />
        <LinkButton text={t('hireUs')} path="/" />
      </div>
    </div>
  );
}

export default Header;
