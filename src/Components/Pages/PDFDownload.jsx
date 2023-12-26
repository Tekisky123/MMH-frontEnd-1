import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PDFDownload = ({ item }) => {
  const generatePdf = () => {
    const pdf = new jsPDF();

    const imgData = require("../../Assets/Images/MMH-PDF.jpeg");
    pdf.addImage(imgData, "JPEG", -18, 10, 250, 30);

    // Add content to the PDF
    // const contentStartY = 70;
    const fontSize = 20; // Set your desired font size
    const textColor = [255, 60, 0]; // Set your desired text color (here, it's red)
    const leftMargin = 60;
    pdf.setFontSize(fontSize);
    pdf.setTextColor(textColor[0], textColor[1], textColor[2]);

    const text = "Disease Name: " + item.diseaseDetail.name;
    const textWidth = pdf.getStringUnitWidth(text) * pdf.internal.getFontSize();
    const x = leftMargin;
    const y = 56;

    pdf.text(text, x, y);
    // pdf.rect(10, 10, 100, 10);

    pdf.autoTable({
      head: [["Patient Details", ""]],
      body: [
        ["Patient Name", item.patientDetails.name],
        ["Gender", item.patientDetails.sex],
        ["Age", item.patientDetails.age],
        ["Mobile No.", item.patientDetails.mobile],
        ["Aadhar No.", item.patientDetails.aadhar],
        ["Residential Address", item.patientDetails.address],
        ["Taluka", item.patientDetails.talukha],
        ["Dist", item.patientDetails.district],
        ["State", item.patientDetails.state],
      ],
      startY: 60,
    });

    // pdf.addPage();

    pdf.text("", 10, 10);
    pdf.autoTable({
      head: [
        [
          "Sr.No.",
          "Family Member",
          "Relation",
          "Age",
          "Occupation",
          "Monthly Income",
        ],
      ],
      body: item.familyDetail.map((familyMember, familyIndex) => [
        familyIndex + 1,
        familyMember.name,
        familyMember.relation,
        familyMember.age,
        familyMember.occupation,
        familyMember.monthlyIncome,
      ]),
    });

    // pdf.addPage();

    pdf.text("", 10, 10);
    pdf.autoTable({
      head: [["Care Taker", ""]],
      body: [
        ["Name", item.careTaker.name],
        ["Mobile No.1", item.careTaker.mobile1],
        ["Mobile No.2", item.careTaker.mobile2],
        ["Particulars", item.careTaker.particulars],
      ],
    });

    // pdf.addPage();

    pdf.text("", 10, 10);
    pdf.autoTable({
      head: [["Disease Details", ""]],
      body: [
        ["Disease Name", item.diseaseDetail.name],
        ["Diagnose Date", item.diseaseDetail.diagnoseDate],
        ["Diagnose by Dr", item.diseaseDetail.diagnoseBy],
        ["Investigation Done 1", item.diseaseDetail.investigationDone1],
        ["Investigation Done 2", item.diseaseDetail.investigationDone2],
        ["Investigation Done 3", item.diseaseDetail.investigationDone3],
        ["Current Hospital Name", item.diseaseDetail.currentHospitalName],
        ["Address", item.diseaseDetail.currentHospitalAddress],
        ["Contact No.", item.diseaseDetail.currentHospitalContactNo],
        [
          "Current Treatment Details",
          item.diseaseDetail.currentTreatmentDetail,
        ],
        [
          "Doctor’s advice for further process",
          item.diseaseDetail.doctorAdviceForFurtherProcess,
        ],
      ],
    });

    // pdf.addPage();

    pdf.text("", 10, 10);
    pdf.autoTable({
      head: [["Other Details", ""]],
      body: [
        ["Registered Date", item.registeredDate],
        ["Created by", item.createdBy],
        ["Status", item.status],
      ],
    });
    // pdf.addPage();
    pdf.text("", 10, 10);
    pdf.autoTable({
      head: [["Instructions", ""]],
      body: [
        [
          `1) Muslim Medical Help (MMH) is free of charge platform providing help and guidance to the patient on the request of'applicant.
        `,
        ],
        [
          `2) Any service or help/offer/referral/suggestions/advice ete given by MMH is purely a help. either to accept or reject is at sole discretion of applicant/patient. If in case of any loss or damage or injury MMH shall not be held responsible.`,
        ],
        [
          `3) MMH is just a platform that eases the patient to get information and help in regard with various Government Trust Private Hospitals and other information in respect of disease and offer help with information in connected with various hospitals, schemes.`,
        ],
      ],
    });

    const signatureAreas = [
      { width: 55, text: "Sig. of M.O.(M.M.H.)" },
      { width: 55, text: "Verified by" },
      { width: 55, text: "Sig. of Medico Social Worker" },
      { width: 55, text: "Signature of Patient" },
      { width: 55, text: "Signature of Care Taker" },
      { width: 55, text: "Signature of M.M.H." },
    ];

    const signatureAreaHeight = 20;
    const signatureAreaMargin = 10;
    const startY = pdf.autoTable.previous.finalY + 20;

    signatureAreas.forEach((area, i) => {
      const x = 10 + (i % 3) * (area.width + signatureAreaMargin);
      const y =
        startY +
        Math.floor(i / 3) * (signatureAreaHeight + signatureAreaMargin);
      pdf.setFontSize(10);
      pdf.text(area.text, x, y - 5); // Text above the text area
      pdf.rect(x, y, area.width, signatureAreaHeight); // Create a rectangle for the text area
    });

    // Save the PDF
    pdf.save("patient_details.pdf");
  };

  return (
    <div>
      <button
        onClick={generatePdf}
        style={{
          backgroundColor: "#a4c639",
          color: "white",
          padding: "7px",
          borderRadius: "8px",
          border: "none",
          marginTop: "4px",
          fontSize: "15px",
        }}
      >
        Download MMH Form
      </button>
    </div>
  );
};

export default PDFDownload;