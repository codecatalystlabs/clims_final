//@ts-nocheck
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
};

export const exportToPDF = async (data, fileName, heading, subtitle, logoUrl) => {
  const doc = new jsPDF();

  // Add logo
  if (logoUrl) {
    try {
      const img = await loadImage(logoUrl);
      doc.addImage(img, 'PNG', 10, 10, 50, 20); // Adjust the dimensions and position as needed
    } catch (err) {
      console.error('Failed to load image', err);
    }
  }

  // Add heading
  doc.setFontSize(18);
  doc.text(heading, 70, 20); // Adjust the position as needed

  // Add subtitle
  doc.setFontSize(14);
  doc.text(subtitle, 70, 30); // Adjust the position as needed

  // Add some space between subtitle and table
  doc.setFontSize(12);
  doc.text(' ', 10, 40);

  // Add table
  const tableColumn = Object.keys(data[0]);
  const tableRows = data.map(item => Object.values(item));

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 50, // Adjust the start position as needed
  });

  doc.save(`${fileName}.pdf`);
};
