
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TableComponentProps {
  rows?: number;
  columns?: number;
  headers?: string[];
  data?: string[][];
}

const TableComponent: React.FC<TableComponentProps> = ({
  rows = 3,
  columns = 3,
  headers = ['Header 1', 'Header 2', 'Header 3'],
  data = [
    ['Cell 1-1', 'Cell 1-2', 'Cell 1-3'],
    ['Cell 2-1', 'Cell 2-2', 'Cell 2-3'],
    ['Cell 3-1', 'Cell 3-2', 'Cell 3-3'],
  ],
}) => {
  // Ensure data dimensions match specified rows and columns
  const tableData = Array(rows)
    .fill(0)
    .map((_, rowIndex) =>
      Array(columns)
        .fill(0)
        .map((_, colIndex) => {
          if (data && data[rowIndex] && data[rowIndex][colIndex]) {
            return data[rowIndex][colIndex];
          }
          return `Cell ${rowIndex + 1}-${colIndex + 1}`;
        })
    );

  // Ensure headers match columns
  const tableHeaders = Array(columns)
    .fill(0)
    .map((_, index) => {
      if (headers && headers[index]) {
        return headers[index];
      }
      return `Header ${index + 1}`;
    });

  return (
    <div className="w-full h-full overflow-auto p-1">
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
