'use client';
import { Search } from '@/components/Search';
import styles from './styles.module.scss';
import { CopyPlus, ScanSearch, Shuffle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ListEntries } from '@/components/ListEntries';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const rounter = useRouter();
  const [onSearch, setOnSearch] = React.useState(false);
  const getAllList = async () => {
    const { data } = await axios.get('/api');
    const randomList = data.wikiList[Math.floor(Math.random() * data.wikiList.length)];
    rounter.push(`/wiki/${randomList}`);
  };
  return (
    <div className={styles.container}>
      <p>by Матвиенко Александр</p>
      <h1>{onSearch ? 'Найди свою статью' : 'Энциклопедия | Список статей'}</h1>
      <div className={styles.buttons}>
        <Link className={styles.plus} href="/wiki/addNewPost">
          <CopyPlus strokeWidth={1.3} size={30} color="#333" />
        </Link>
        <ScanSearch
          className={styles.search}
          strokeWidth={1.4}
          size={30}
          color="#333"
          onClick={() => setOnSearch(!onSearch)}
        />
        <Shuffle
          className={styles.random}
          strokeWidth={1.4}
          size={28}
          color="#333"
          onClick={getAllList}
        />
        {onSearch ? <Search /> : <ListEntries />}
      </div>
    </div>
  );
}
