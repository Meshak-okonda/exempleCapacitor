import React from "react";
import pdf from "../assets/pdf.png";
import { Button } from "@mui/material";
import { Upload as UploadIcon } from "../icons/upload";
import {FaFilePdf} from 'react-icons/fa';

export default function ButtonSaveToPdf({ title, nameFile, data, formData }) {
  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.text(nameFile, 50, 10);
        doc.autoTable(formData, data);
        const date = new Date();
        const dateFormat = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        doc.save(`${nameFile.replace(/\s/g, "")}Au${dateFormat}.pdf`);
      });
    });
  };
  return (
    <Button
      onClick={exportPdf}
      startIcon={<FaFilePdf color='red' fontSize="small" />}
      sx={{ mr: 1 }}
    >
      Export PDF
    </Button>
  );
}
