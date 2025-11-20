import { RoadmapContent } from '../types';

export const processContent = (text: string): RoadmapContent => {
  if (!text) return { html: '', data: null };

  text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  text = text.replace(/^#{1,6}\s+(.+)$/gm, '<h3 class="text-2xl font-bold text-indigo-900 mt-8 mb-4 pb-2 border-b-2 border-indigo-200">$1</h3>');
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
  text = text.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
  text = text.replace(/^(\d+)\.\s+(.+)$/gm, '<li class="ml-6 my-3 pl-2"><span class="font-semibold text-indigo-600">$1.</span> $2</li>');
  text = text.replace(/^[-•]\s+(.+)$/gm, '<li class="ml-6 my-3 pl-2 list-disc">$1</li>');
  text = text.replace(/(<li[^>]*>.*?<\/li>\s*)+/gs, '<ul class="space-y-2 my-4">$&</ul>');

  text = text.replace(/\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g, (match, header, rows) => {
    const headers = header.split('|').filter((h: string) => h.trim()).map((h: string) => h.trim());
    const rowData = rows.trim().split('\n').map((row: string) =>
      row.split('|').filter((cell: string) => cell.trim()).map((cell: string) => cell.trim())
    );

    let table = '<div class="overflow-x-auto my-6"><table class="min-w-full border-collapse border border-gray-300 rounded-lg">';
    table += '<thead class="bg-indigo-100"><tr>';
    headers.forEach((h: string) => {
      table += `<th class="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">${h}</th>`;
    });
    table += '</tr></thead><tbody>';

    rowData.forEach((row: string[], idx: number) => {
      table += `<tr class="${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">`;
      row.forEach((cell: string) => {
        table += `<td class="border border-gray-300 px-4 py-3 text-gray-700">${cell}</td>`;
      });
      table += '</tr>';
    });

    table += '</tbody></table></div>';
    return table;
  });

  text = text.replace(/^(?!<[hl]|<ul|<table|<div)(.+)$/gm, '<p class="my-3 text-gray-700 leading-relaxed">$1</p>');

  return { html: text, data: null };
};
