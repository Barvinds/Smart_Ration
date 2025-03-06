import React from 'react';
import QRCode from 'qrcode.react';
import { useLocation } from 'react-router-dom';

const QRCodePage = () => {
    const { state } = useLocation();
    const { formData } = state || {};

    const qrData = JSON.stringify(formData);

    return (
        <section className="container">
            <h2>Your QR Code</h2>
            <QRCode value={qrData} />
            <p>Here is your QR code containing your registration information.</p>
        </section>
    );
};

export default QRCodePage;
