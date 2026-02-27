import React, { useState, useEffect, useRef } from "react";
import "../../Assets/Styles/RegisteredPatients.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import UploadDocuments from "../UploadDocuments";
import ViewMMH from "../ViewMMH";
import MMH from "../MMH";
import CloseApplication from "../CloseApplication";
import PDFDownload from "./PDFDownload";
import ConfirmModal from "../common/ConfirmModal";
import countries from "../../common/CommonObj";
import BaseURL from "../../common/Api";
import {
  MdSearch, MdPerson, MdPhone, MdLocalHospital, MdClose,
  MdUpload, MdLockOpen, MdCalendarToday, MdBadge,
  MdDeleteForever, MdEdit, MdPictureAsPdf, MdVisibility,
  MdFamilyRestroom, MdMedicalServices, MdLocationOn,
  MdOutlineInfo, MdAssignment, MdUploadFile, MdLockOutline,
  MdFolder, MdAttachFile
} from "react-icons/md";

/* ── helpers ── */
const isClosed = (status) =>
  ["Closed-Patient Rejected", "Closed-Civil", "Closed-Civil Hospital",
    "Closed-Ayushman Bharat", "Closed-Private", "Closed-MJPJA",
    "Closed-Other", "Application Closed"].includes(status);

const STATUS_MAP = {
  "Documents Uploaded": { bg: "#e6f4ea", color: "#1e7e34", dot: "#1e7e34" },
  "Scheme & Hospital Selected": { bg: "#e8f0fe", color: "#1a73e8", dot: "#1a73e8" },
  "Patient Registered": { bg: "#fff8e6", color: "#e67e00", dot: "#e67e00" },
  "Closed-MJPJA": { bg: "#fce8e6", color: "#c0392b", dot: "#c0392b" },
  "Closed-Private": { bg: "#fce8e6", color: "#c0392b", dot: "#c0392b" },
  "Closed-Patient Rejected": { bg: "#fce8e6", color: "#c0392b", dot: "#c0392b" },
  "Closed-Civil Hospital": { bg: "#fce8e6", color: "#c0392b", dot: "#c0392b" },
  "Closed-Ayushman Bharat": { bg: "#fce8e6", color: "#c0392b", dot: "#c0392b" },
  "Closed-Other": { bg: "#fce8e6", color: "#c0392b", dot: "#c0392b" },
};
const DEFAULT_S = { bg: "#f0f0f0", color: "#555", dot: "#999" };

const getStateName = (index) => {
  if (index >= 0 && index < countries.length) return countries[index].state;
  return "";
};
const fmt = (d) => {
  if (!d) return "—";
  try { return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }
  catch { return d; }
};

/* ═══════════════════════════════════════
   MODAL
═══════════════════════════════════════ */
const PatientModal = ({ item, onClose, onDelete, onEdit }) => {
  const [tab, setTab] = useState("details"); // details | upload | close
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const s = STATUS_MAP[item.status] || DEFAULT_S;
  const pdfRef = useRef();

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  const Row = ({ label, value }) => (
    <div className="rpm-row">
      <span className="rpm-row-key">{label}</span>
      <span className="rpm-row-val">{value || "—"}</span>
    </div>
  );

  return (
    <div className="rpm-overlay" onClick={onClose}>
      <div className="rpm-modal" onClick={e => e.stopPropagation()}>

        {/* ── Modal header ── */}
        <div className="rpm-modal-head">
          <div className="rpm-mh-left">
            <div className="rpm-mh-id"><MdBadge /> {item.patientID}</div>
            <h2 className="rpm-mh-name">{item.patientDetails.name}</h2>
            <span className="rpm-mh-badge" style={{ background: s.bg, color: s.color }}>
              <span className="rpm-dot" style={{ background: s.dot }} />
              {item.status}
            </span>
          </div>
          <button className="rpm-close-btn" onClick={onClose}><MdClose /></button>
        </div>

        {/* ── Action bar ── */}
        <div className="rpm-action-bar">
          <button className="rpm-act-btn rpm-act--edit" onClick={() => onEdit(item._id)}>
            <MdEdit /> Edit
          </button>
          <button className="rpm-act-btn rpm-act--delete" onClick={() => setIsDeleteModalOpen(true)}>
            <MdDeleteForever /> Delete
          </button>
          <span className="rpm-act-btn rpm-act--pdf">
            <MdPictureAsPdf />
            <PDFDownload item={item} />
          </span>
          {!isClosed(item.status) && (
            <>
              <button
                className={`rpm-act-btn rpm-act--upload${tab === "upload" ? " rpm-act--active" : ""}`}
                onClick={() => setTab(t => t === "upload" ? "details" : "upload")}
              >
                <MdUpload /> Upload Docs
              </button>
              <button
                className={`rpm-act-btn rpm-act--close${tab === "close" ? " rpm-act--active" : ""}`}
                onClick={() => setTab(t => t === "close" ? "details" : "close")}
              >
                <MdLockOpen /> Close App
              </button>
            </>
          )}
        </div>

        {/* ── Tab nav ── */}
        <div className="rpm-tabs">
          {["details", "upload", "close"]
            .filter(t => t === "details" || (t !== "details" && !isClosed(item.status)))
            .map(t => (
              <button
                key={t}
                className={`rpm-tab${tab === t ? " rpm-tab--active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t === "details" && <><MdAssignment /> Details</>}
                {t === "upload" && <><MdUploadFile /> Upload Documents</>}
                {t === "close" && <><MdLockOutline /> Close Application</>}
              </button>
            ))}
        </div>

        {/* ── Tab body ── */}
        <div className="rpm-modal-body">

          {tab === "details" && (
            <>
              {/* Patient */}
              <div className="rpm-section">
                <div className="rpm-section-head"><MdPerson /> Patient Details</div>
                <div className="rpm-grid-2">
                  <Row label="Full Name" value={item.patientDetails.name} />
                  <Row label="Gender" value={item.patientDetails.sex} />
                  <Row label="Age" value={`${item.patientDetails.age} yrs`} />
                  <Row label="Mobile" value={item.patientDetails.mobile} />
                  <Row label="Aadhar" value={item.patientDetails.aadhar} />
                  <Row label="Ration Card" value={item.patientDetails.rationcardnumber} />
                  <Row label="Marital" value={item.patientDetails.maritalstatus} />
                  <Row label="Address" value={item.patientDetails.address} />
                  <Row label="Taluka" value={item.patientDetails.talukha} />
                  <Row label="District" value={item.patientDetails.district} />
                  <Row label="State" value={getStateName(item.patientDetails.state)} />
                  <Row label="Pincode" value={item.patientDetails.pin} />
                </div>
              </div>

              {/* Family */}
              {item.familyDetail?.length > 0 && (
                <div className="rpm-section">
                  <div className="rpm-section-head"><MdFamilyRestroom /> Family Details</div>
                  <div className="rpm-table-wrap">
                    <table className="rpm-table">
                      <thead>
                        <tr><th>#</th><th>Name</th><th>Relation</th><th>Age</th><th>Occupation</th><th>Income/mo</th></tr>
                      </thead>
                      <tbody>
                        {item.familyDetail.map((f, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td><td>{f.name}</td><td>{f.relation}</td>
                            <td>{f.age}</td><td>{f.occupation}</td>
                            <td>₹{Number(f.monthlyIncome).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Care Taker */}
              <div className="rpm-section">
                <div className="rpm-section-head"><MdPhone /> Care Taker</div>
                <div className="rpm-grid-2">
                  <Row label="Name" value={item.careTaker.name} />
                  <Row label="Mobile 1" value={item.careTaker.mobile1} />
                  <Row label="Mobile 2" value={item.careTaker.mobile2} />
                  <Row label="Particulars" value={item.careTaker.particulars} />
                </div>
              </div>

              {/* Disease */}
              <div className="rpm-section">
                <div className="rpm-section-head"><MdMedicalServices /> Disease Details</div>
                <div className="rpm-grid-2">
                  <Row label="Disease" value={item.diseaseDetail.name} />
                  <Row label="Diagnose Date" value={fmt(item.diseaseDetail.diagnoseDate)} />
                  <Row label="Diagnosed By" value={item.diseaseDetail.diagnoseBy} />
                  <Row label="Investigation 1" value={item.diseaseDetail.investigationDone1} />
                  <Row label="Investigation 2" value={item.diseaseDetail.investigationDone2} />
                  <Row label="Investigation 3" value={item.diseaseDetail.investigationDone3} />
                  <Row label="Hospital" value={item.diseaseDetail.currentHospitalName} />
                  <Row label="Hospital Addr" value={item.diseaseDetail.currentHospitalAddress} />
                  <Row label="Hospital Tel" value={item.diseaseDetail.currentHospitalContactNo} />
                  <Row label="Treatment" value={item.diseaseDetail.currentTreatmentDetail} />
                  <Row label="Doctor's Advice" value={item.diseaseDetail.doctorAdviceForFurtherProcess} />
                </div>
              </div>

              {/* Reg info */}
              <div className="rpm-section">
                <div className="rpm-section-head"><MdOutlineInfo /> Registration Info</div>
                <div className="rpm-grid-2">
                  <Row label="Patient ID" value={item.patientID} />
                  <Row label="Referred By" value={item.referredBy} />
                  <Row label="Created By" value={item.createdBy} />
                  <Row label="Registered On" value={fmt(item.registeredDate)} />
                </div>
              </div>

              {/* Documents */}
              {item.documents?.length > 0 && (
                <div className="rpm-section">
                  <div className="rpm-section-head"><MdFolder /> Documents</div>
                  <div className="rpm-docs-list">
                    {item.documents.map((doc, i) => (
                      <a key={i} href={doc.imageUrl} target="_blank" rel="noreferrer" className="rpm-doc-link">
                        <MdAttachFile style={{ marginRight: 4 }} />
                        {doc.imageName ? doc.imageName.split("/").pop() : `Document ${i + 1}`}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* MMH / ViewMMH */}
              <div className="rpm-section">
                {item.schemeName
                  ? <MMH item={item} isDownloading={false} pdfRef={pdfRef} />
                  : (!isClosed(item.status) && <ViewMMH currentItem={item._id} />)
                }
              </div>
            </>
          )}

          {tab === "upload" && (
            <div className="rpm-section">
              <UploadDocuments currentItem={item._id} onClose={() => setTab("details")} />
            </div>
          )}

          {tab === "close" && (
            <div className="rpm-section">
              <CloseApplication
                handleSidebarClose={() => setTab("details")}
                currentItem={item._id}
                index={0}
              />
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Patient Deletion (from Modal View) */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Confirm Patient Deletion"
        message="Are you sure you want to permanently delete this patient record? This action cannot be easily undone."
        confirmText="Yes, Delete Patient"
        cancelText="Cancel"
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          onDelete(item._id);
          onClose();
        }}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

/* ═══════════════════════════════════════
   MAIN  PAGE
═══════════════════════════════════════ */
const OpRegisteredPatients = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const { cardStatus } = useParams();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const baseURL = `${BaseURL}/patient/getpatient`;

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const mobileNum = localStorage.getItem("mobileNumber");
        const url = `${BaseURL}/mmh/dashboard/operator?phoneNumber=${mobileNum}`;
        const result = await axios.get(url);
        const allData = result.data.details.allDataResponse;
        if (mounted) {
          setData(allData);
          setFilteredData([...allData].reverse());
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        if (mounted) {
          setData([]); // Set to empty array on error
          setFilteredData([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => { mounted = false; };
  }, [cardStatus]);

  useEffect(() => {
    if (cardStatus === "documentsUploaded") setSearchTerm("Documents Uploaded");
    else if (cardStatus === "scheme&hospital") setSearchTerm("Scheme & Hospital Selected");
    else if (cardStatus === "pending") setSearchTerm("Patient Registered");
  }, [cardStatus]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    setFilteredData(data.filter(item =>
      item.patientDetails.name.toLowerCase().includes(term) ||
      item.patientID.toLowerCase().includes(term) ||
      item.status.toLowerCase().includes(term)
    ));
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, data]);

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const executeDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`${BaseURL}/patient/${deleteId}`);
      setData(p => p.filter(x => x._id !== deleteId));
      setFilteredData(p => p.filter(x => x._id !== deleteId));
    } catch (e) {
      console.error(e);
    } finally {
      setDeleteId(null);
    }
  };

  const handleEdit = (id) => { window.location.href = `/editPatient/${id}`; };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="rpt-root">

      {/* Header */}
      <div className="rpt-page-header">
        <div>
          <h1 className="rpt-page-title">Registered Patients</h1>
          <p className="rpt-page-sub">{filteredData.length} record{filteredData.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="rpt-search-wrap">
          <MdSearch className="rpt-search-icon" />
          <input
            className="rpt-search"
            type="text"
            placeholder="Search by name, ID or status…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="rpt-grid">
        {/* Show skeletons while loading */}
        {loading && (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((skeleton) => (
              <div key={skeleton} className="rpt-card skeleton-card">
                <div className="rpt-card-top" style={{ paddingBottom: '16px' }}>
                  <div className="skeleton-line" style={{ width: '100px', height: '20px', background: '#e2e8f0', borderRadius: '4px' }}></div>
                  <div className="skeleton-pulse" style={{ width: '12px', height: '12px', background: '#cbd5e1', borderRadius: '50%' }}></div>
                </div>

                <div className="rpt-disease-row" style={{ padding: '0 0 16px' }}>
                  <div className="skeleton-pulse" style={{ width: '20px', height: '20px', background: '#e2e8f0', borderRadius: '4px', marginRight: '12px' }}></div>
                  <div className="skeleton-line" style={{ width: '70%', height: '20px', background: '#e2e8f0', borderRadius: '4px' }}></div>
                </div>

                <div className="rpt-divider" style={{ margin: '0 0 16px' }}></div>

                <div className="rpt-info-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '16px' }}>
                  {[1, 2, 3, 4].map(idx => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="skeleton-pulse" style={{ width: '16px', height: '16px', background: '#e2e8f0', borderRadius: '4px' }}></div>
                      <div className="skeleton-line" style={{ width: '40px', height: '14px', background: '#f1f5f9', borderRadius: '4px' }}></div>
                      <div className="skeleton-line" style={{ flex: 1, height: '14px', background: '#e2e8f0', borderRadius: '4px' }}></div>
                    </div>
                  ))}
                </div>

                <div className="skeleton-line" style={{ width: '120px', height: '26px', background: '#cbd5e1', borderRadius: '12px', marginBottom: '16px' }}></div>
                <div className="skeleton-line" style={{ width: '100%', height: '40px', background: '#e2e8f0', borderRadius: '8px' }}></div>
              </div>
            ))}
          </>
        )}

        {/* Show real data if not loading */}
        {!loading && currentItems.length > 0 && (
          <>
            {currentItems.map((item) => {
              const s = STATUS_MAP[item.status] || DEFAULT_S;
              return (
                <div key={item._id} className="rpt-card">

                  {/* Top: ID + status dot */}
                  <div className="rpt-card-top">
                    <span className="rpt-card-id"><MdBadge />{item.patientID}</span>
                    <span className="rpt-card-dot" style={{ background: s.dot }} title={item.status} />
                  </div>

                  {/* Disease */}
                  <div className="rpt-disease-row">
                    <MdMedicalServices className="rpt-disease-icon" />
                    <span className="rpt-disease-name">{item.diseaseDetail.name}</span>
                  </div>

                  {/* Divider */}
                  <div className="rpt-divider" />

                  {/* Patient info rows */}
                  <div className="rpt-info-list">
                    <div className="rpt-info-item">
                      <MdPerson className="rpt-ii-icon" />
                      <span className="rpt-ii-label">Patient</span>
                      <span className="rpt-ii-val">{item.patientDetails.name}</span>
                    </div>
                    <div className="rpt-info-item">
                      <MdPhone className="rpt-ii-icon" />
                      <span className="rpt-ii-label">Mobile</span>
                      <span className="rpt-ii-val">{item.patientDetails.mobile}</span>
                    </div>
                    <div className="rpt-info-item">
                      <MdLocalHospital className="rpt-ii-icon" />
                      <span className="rpt-ii-label">Hospital</span>
                      <span className="rpt-ii-val">{item.diseaseDetail.currentHospitalName || "—"}</span>
                    </div>
                    <div className="rpt-info-item">
                      <MdCalendarToday className="rpt-ii-icon" />
                      <span className="rpt-ii-label">Registered</span>
                      <span className="rpt-ii-val">{fmt(item.registeredDate)}</span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <span className="rpt-status-badge" style={{ background: s.bg, color: s.color }}>
                    {item.status}
                  </span>

                  {/* Single action button */}
                  <button
                    className="rpt-view-btn"
                    onClick={() => setActiveItem(item)}
                  >
                    <MdVisibility /> View Details
                  </button>
                </div>
              );
            })}
          </>
        )}

        {/* Empty State (Search failed but data exists) */}
        {!loading && data.length > 0 && filteredData.length === 0 && (
          <div className="rpt-empty">
            <MdSearch className="rpt-empty-icon" style={{ fontSize: "3rem", color: "#cbd5e1" }} />
            <p>No patients match your search.</p>
          </div>
        )}

        {/* Empty State (Database empty) */}
        {data.length === 0 && (
          <div className="rpt-empty">
            <MdPerson className="rpt-empty-icon" style={{ fontSize: "3rem", color: "#cbd5e1" }} />
            <p>No patients registered yet.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="rpt-pagination">
          <button
            className="rpt-page-btn"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <div className="rpt-page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                className={`rpt-page-num ${currentPage === number ? 'rpt-page-num--active' : ''}`}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            className="rpt-page-btn"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {activeItem && (
        <PatientModal
          item={activeItem}
          onClose={() => setActiveItem(null)}
          onDelete={() => handleDelete(activeItem._id)}
          onEdit={handleEdit}
        />
      )}

      {/* Confirmation Modal for Patient Deletion (from Grid View) */}
      <ConfirmModal
        isOpen={deleteId !== null}
        title="Confirm Patient Deletion"
        message="Are you sure you want to permanently delete this patient record? This action cannot be easily undone."
        confirmText="Yes, Delete Patient"
        cancelText="Cancel"
        onConfirm={executeDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default OpRegisteredPatients;
