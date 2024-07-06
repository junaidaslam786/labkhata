import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Box,
} from '@mui/material';
import { useDeleteTransactionMutation } from '@labkhata/store';
import TransactionDetailsModal from './details/TransactionDetailsModal';

interface Transaction {
  id: number;
  name: string;
  amount: number;
  credit: string;
  debit: number;
  // journalEntries: {
  //   accountId: number;
  //   debit: number;
  //   credit: number;
  // }[];
}

interface TransactionProps {
  rows: Transaction[];
}

interface Column {
  id: keyof Transaction;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'id', label: 'ID', minWidth: 100 },
  {
    id: 'name',
    label: 'Name',
    minWidth: 200,
  },
  { id: 'amount', label: 'Amount', minWidth: 170 },
  { id: 'debit', label: 'Debited Amount', minWidth: 100 },
  { id: 'credit', label: 'Credited Amount', minWidth: 100 },
];

const Transaction: React.FC<TransactionProps> = ({ rows }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTransaction] = useDeleteTransactionMutation();
  const navigate = useNavigate();

  const handleOpenModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  const handleDeleteTransaction = async (id: number) => {
    await deleteTransaction(id).unwrap();
  };

  const handleUpdateTransaction = (transaction: Transaction) => {
    navigate('/admin/transactions/new', { state: { transaction } });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Transactions
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id as string}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id as string} align={column.align}>
                        {Array.isArray(value)
                          ? value.map((entry, index) => (
                              <Box key={index}>
                                Account: {entry.accountId}, Debit: {entry.debit}
                                , Credit: {entry.credit}
                              </Box>
                            ))
                          : column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleOpenModal(row)}
                      sx={{ marginRight: '1vw' }}
                    >
                      Details
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleUpdateTransaction(row)}
                      sx={{ marginRight: '1vw' }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteTransaction(row.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {selectedTransaction && (
        <TransactionDetailsModal
          open={isModalOpen}
          onClose={handleCloseModal}
          transaction={selectedTransaction}
        />
      )}
    </Paper>
  );
};

export default Transaction;
