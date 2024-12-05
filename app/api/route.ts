import { NextRequest, NextResponse } from 'next/server';
import { list_entries, get_entry, save_entry, update_entry } from '@/util';

export async function GET() {
  const allList = list_entries();
  return NextResponse.json({ wikiList: allList });
}

export async function POST(request: NextRequest) {
  const { title, content, oldTitle } = await request.json();
  if (oldTitle) {
    update_entry(oldTitle, title, content);
    return NextResponse.json({ message: 'Запись изменена успешно' });
  } else {
    if (title && content) {
      save_entry(title, content);
      return NextResponse.json({ message: 'Запись создана успешно' });
    } else if (title) {
      const content = get_entry(title);
      return NextResponse.json({ title, content });
    } else {
      return NextResponse.json({ message: 'Некорректный запрос' }, { status: 400 });
    }
  }
}
