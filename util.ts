import fs from 'fs';
import path from 'path';

const entriesDirectory = path.join(process.cwd(), 'entries');

export function list_entries(): string[] {
  return fs.readdirSync(entriesDirectory).map((file) => path.parse(file).name);
} // возвращает список названий всех записей в энциклопедии

export function save_entry(title: string, content: string): void {
  const filepath = path.join(entriesDirectory, `${title}.md`);
  fs.writeFileSync(filepath, content, 'utf8');
} // сохраняет новую запись в энциклопедии

export function get_entry(title: string): string | null {
  const filepath = path.join(entriesDirectory, `${title}.md`);
  if (fs.existsSync(filepath)) {
    return fs.readFileSync(filepath, 'utf8');
  }
  return null;
} // извлекает запись в энциклопедии по её названию (возвращает содержимое)

export function update_entry(oldTitle: string, newTitle: string, newContent: string): void {
  const oldContent = get_entry(oldTitle);
  if (oldContent !== null) {
    fs.unlinkSync(path.join(entriesDirectory, `${oldTitle}.md`));
    save_entry(newTitle, newContent);
  }
} // обновляет запись в энциклопедии
