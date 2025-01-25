import { useEffect, useState } from 'react';
import ImageComponent from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import LangItem from './LangItem';

import type { Language } from './interfaces/ILangSelector';
import type ILangSelector from './interfaces/ILangSelector';

import styles from './sass/LangSelector.module.scss';

function LangSelector({ list }:ILangSelector) {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(list[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const carrentUrl = pathname.split('/')[1];
    const language = list.find((item) => item.code === carrentUrl);
    if (language) {
      setSelectedLanguage(language);
    }
  }, [pathname]);

  const onChangeLanguage = (item: Language) => {
    const currentUrl = pathname.split('/')[1];
    const pathWithoutLanguage = pathname.replace(`/${currentUrl}`, '');
    const newUrl = `/${item.code}${pathWithoutLanguage}`;
    router.push(newUrl);
  };

  const onHandleSelect = (item: Language) => {
    setSelectedLanguage(item);
    onChangeLanguage(item);
    setIsOpen(false);
  };

  const onHandleOpen = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={styles.container}
      role="menu"
      tabIndex={0}
      onMouseLeave={() => setIsOpen(false)}
      onKeyDown={() => setIsOpen(false)}
    >
      <button className={styles.selectedItem} type="button" onClick={onHandleOpen}>
        <LangItem item={selectedLanguage} />
        <ImageComponent
          src="/img_WhiteArrow.webp"
          alt="image"
          width={8}
          height={6}
        />
      </button>
      { isOpen ? (
        <div className={styles.list}>
          {list.map((item, index) => (
            <button
              key={[item.code, index].join('_')}
              className={styles.itemOption}
              onClick={() => onHandleSelect(item)}
              type="button"
              aria-label={`Select language ${item.name}`}
            >
              <LangItem
                item={item}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default LangSelector;
