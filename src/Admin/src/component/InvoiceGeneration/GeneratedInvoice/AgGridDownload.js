import axios from 'axios';
import React from 'react';
import { FaDownload } from 'react-icons/fa'; // You may need to install the 'react-icons/fa' package
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axiosInstance from '../../axiosconfig';
const AgGridDownload = (props) => {
    // Add your logic here to handle the download action when the icon is clicked
    // console.log(props);
    const url = process.env.REACT_APP_SERVICE_ID


    const handleDownloadClick = () => {
        axiosInstance.post('downloadInvoice', props.param.data).then((res) => {
            if (res.status === 200) {
                const byteCharacters = atob(res.data.split(',')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = `${props.param.data.GSTNumber}.pdf`;
                document.body.appendChild(a);
                a.click();
            
                // Clean up the URL object
                URL.revokeObjectURL(url);







                // const blob = new Blob([res.data], { type: 'application/pdf' });
                // const url = URL.createObjectURL(blob);

                // const a = document.createElement('a');
                // a.href = url;
                // a.download = 'example.pdf'; 
                // a.click();
                // const decodedHtml = atob(res.data);

                // console.log(decodedHtml)

                // const pdfOptions = {
                //     margin: 10,
                //     filename: 'document.pdf',
                //     image: { type: 'jpeg', quality: 0.98 },
                //     html2canvas: { scale: 2 },
                //     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                //   };

                //   html2pdf().from(decodedHtml).set(pdfOptions).outputPdf((pdf) => {
                //     // You can save or display the PDF here
                //     pdf.save();
                //     console.log(pdf)


                //     // const blob = new Blob([pdf.output('blob')], { type: 'application/pdf' });

                //     // // Create a URL for the blob
                //     // const url = window.URL.createObjectURL(blob);

                //     // // Create an anchor tag with the URL and download attribute
                //     // const a = document.createElement('a');
                //     // a.href = url;
                //     // a.download = 'document.pdf';

                //     // // Programmatically trigger a click event on the anchor tag
                //     // a.click();

                //     // // Clean up by revoking the blob URL
                //     // window.URL.revokeObjectURL(url);



                //   });








            } else {
                console.error('Unexpected response status:', res.status);
            }

        })

    }


    return (
        <div>

            <button className='AdBtn' onClick={handleDownloadClick}>
                <FaDownload />
            </button>
        </div>
    );
};

export default AgGridDownload;
