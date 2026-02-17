// This file is reserved for advanced PDF utilities.
// Currently, html2canvas and jspdf logic is handled directly in PosterPreview.tsx
// to manage DOM references and React state easily.

export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};