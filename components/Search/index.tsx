'use client';
import React from 'react';
import styles from './styles.module.scss';
import { Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
interface Props {
  className?: string;
}
export const Search: React.FC<Props> = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [searchList, setSearchList] = React.useState<string[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const { data } = await axios.get('/api');
    const newList: string[] = [];
    data.wikiList.forEach((list: string) => {
      if (list.toLowerCase().includes(e.target.value.toLowerCase())) {
        newList.push(list);
      }
    });
    setSearchList(newList);
  };

  return (
    <>
      <div className={styles.searchBlock}>
        <input
          value={searchValue}
          onChange={handleSearch}
          className={styles.searchInput}
          type="text"
          placeholder="Поиск статьи..."
        />
        <Link href={`/wiki/${searchValue}`}>
          <SearchIcon size={26} strokeWidth={1} className={styles.icon} />
        </Link>
      </div>
      {searchList.map((title) => (
        <div key={title} className={styles.list}>
          <a href={`/wiki/${title}`}>{title}</a>
        </div>
      ))}
    </>
  );
};
