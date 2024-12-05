'use client';
import React from 'react';
import styles from './styles.module.scss';
import axios from 'axios';
export const ListEntries: React.FC = () => {
  const [listEntries, setListEntries] = React.useState([]);
  const getAllList = async () => {
    const { data } = await axios.get('/api');
    setListEntries(data.wikiList);
  };
  React.useEffect(() => {
    getAllList();
  }, []);
  return (
    <div className={styles.blockList}>
      {listEntries?.map((title: string) => (
        <div key={title} className={styles.list}>
          <a href={`/wiki/${title}`}>{title}</a>
        </div>
      ))}
    </div>
  );
};
