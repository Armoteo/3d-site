import useTranslation from '../../i18n';
import HomeView from './components/pagesView/HomeView/HomeView';

import type { IPage } from './interfaces/IPage';

export default async function Home({ params: { lng } }: IPage) {
  const { t } = await useTranslation(lng, 'common');
  return (
    <HomeView title={t('title')} />
  );
}
