import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

interface TransactionDetailsModalProps {
  open: boolean;
  onClose: () => void;
  transaction: any;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  open,
  onClose,
  transaction,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Transaction Details
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          ID: {transaction.id}
        </Typography>
        <Typography>Name: {transaction.name}</Typography>
        <Typography>Amount: {transaction.amount}</Typography>
        <Typography>Debit: {transaction.debit}</Typography>
        <Typography>Credit: {transaction.credit}</Typography>
      </Box>
    </Modal>
  );
};

export default TransactionDetailsModal;
