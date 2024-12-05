'use client';

import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

async function onClickAdd(
  title: React.RefObject<HTMLInputElement>,
  content: React.RefObject<HTMLInputElement>,
  router: AppRouterInstance,
) {
  const titleValue = title.current!.value;
  const contentValue = content.current!.value;
  try {
    const response = await axios.post('/api', {
      title: titleValue,
      content: contentValue,
    });
    console.log(response.data);
    router.push(`/wiki/${title.current!.value}`);
  } catch (error) {
    console.error(error);
  }
}

export default function AddNewPost() {
  const router = useRouter();
  const title = React.useRef(null);
  const content = React.useRef(null);
  return (
    <div className={styles.container}>
      <h1>Новая статья Markdown</h1>
      <div className={styles.newPageForm}>
        <label>
          Заголовок страницы <i>(одно слово)</i>:
          <input ref={title} type="text" placeholder="EN | Заголовок..." />
        </label>
        <label>
          Содержимое страницы <i>(Markdown)</i>:
          <textarea ref={content} />
        </label>
        <button
          type="submit"
          onClick={() => {
            onClickAdd(title, content, router);
          }}>
          Создать новую статью
        </button>
      </div>
      <Link href="/">X Отменить</Link>
    </div>
  );
}
