import Link from 'next/link';
import styles from './styles.module.scss';

export default function NotFound() {
  return (
    <div className={styles.error}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="168"
        height="168"
        viewBox="0 0 24 24"
        fill="#fafa9a"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-triangle-alert">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
      <h1>Статья не найдена</h1>
      <p>По желанию, вы можете ее добавить</p>
      <Link href="/">На главную</Link>
    </div>
  );
}
