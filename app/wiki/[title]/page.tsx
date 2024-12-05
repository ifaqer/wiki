import React from 'react';
import { get_entry } from '@/util';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import styles from './styles.module.scss';
import { FilePenLine, SquareArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Params {
  title: string;
}

interface Props {
  params: Promise<Params>;
}

export const generateMetadata = async ({ params }: Props): Promise<{ title: string }> => {
  const { title } = await params;
  return {
    title,
  };
};

const Wiki: React.FC<Props> = async ({ params }) => {
  const { title } = await params;
  const markdown = get_entry(title);
  if (!markdown) {
    notFound();
  }
  return (
    <div className={styles.container}>
      <Link href={`/wiki/${title}/edit`}>
        <FilePenLine className={styles.rename} strokeWidth={1.4} size={30} color="#333" />
      </Link>
      <MDXRemote source={markdown} />
      <Link href="/" className={styles.back}>
        <SquareArrowLeft size={35} strokeWidth={1} />
        <span>Список статей</span>
      </Link>
    </div>
  );
};

export default Wiki;
