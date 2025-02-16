import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { Box, Typography, Paper, Button } from '@mui/material';
import PageHeader from '../../../components/common/PageHeader';

const FeeVoucher = () => {
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        const fetchVouchers = async () => {
            const querySnapshot = await getDocs(collection(db, 'feeSubmissions'));
            const voucherData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setVouchers(voucherData);
        };
        fetchVouchers();
    }, []);

    const handlePrint = (voucher) => {
        const printContent = document.getElementById(`voucher-${voucher.id}`).innerHTML;
        const printWindow = window.open('', '', 'height=500,width=800');
        printWindow.document.write('<html><head><title>Fee Voucher</title>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <Box>
            <PageHeader title="Fee Vouchers" />
            {vouchers.map((voucher) => (
                <Paper key={voucher.id} id={`voucher-${voucher.id}`} elevation={3} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6">Fee Voucher</Typography>
                    <Typography>Student ID: {voucher.studentId}</Typography>
                    <Typography>Class: {voucher.className}</Typography>
                    <Typography>Amount: {voucher.amount}</Typography>
                    <Button variant="contained" onClick={() => handlePrint(voucher)}>Print</Button>
                </Paper>
            ))}
        </Box>
    );
};

export default FeeVoucher;