'use client';
import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default function Edit() {
  const router = useRouter();
  const [oldTitle, setOldTitle] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const post = usePathname().replace('/wiki/', '').replace('/edit', '');
  async function onClickEdit(router: AppRouterInstance) {
    try {
      const response = await axios.post('/api', {
        title,
        content,
        oldTitle,
      });
      console.log(response.data);
      router.push(`/wiki/${title}`);
    } catch (error) {
      console.error(error);
    }
  }
  const getInfoPost = async () => {
    const { data } = await axios.post('/api', { title: post });
    setOldTitle(data.title);
    setTitle(data.title);
    setContent(data.content);
  };
  React.useEffect(() => {
    getInfoPost();
  }, []);
  return (
    <div className={styles.container}>
      <h1>Редактирование статьи:</h1>
      <div className={styles.newPageForm}>
        <label>
          Заголовок страницы <i>(одно слово)</i>:
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="EN | Заголовок..."
          />
        </label>
        <label>
          Содержимое страницы <i>(Markdown)</i>:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <button
          type="submit"
          onClick={() => {
            onClickEdit(router);
          }}>
          Сохранить изменения
        </button>
      </div>
      <Link href="/">X Отменить</Link>
    </div>
  );
}
