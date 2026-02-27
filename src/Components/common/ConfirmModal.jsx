import React, { useEffect } from "react";
import "../../Assets/Styles/ConfirmModal.css";
import { MdWarning } from "react-icons/md";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel" }) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Handle escape key to close
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                onCancel();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        <div className="npt-confirm-overlay" onClick={onCancel}>
            <div className="npt-confirm-modal" onClick={(e) => e.stopPropagation()}>
                <div className="npt-confirm-header">
                    <div className="npt-confirm-icon-wrap">
                        <MdWarning className="npt-confirm-icon" />
                    </div>
                    <h2 className="npt-confirm-title">{title}</h2>
                </div>
                <div className="npt-confirm-body">
                    <p className="npt-confirm-message">{message}</p>
                </div>
                <div className="npt-confirm-actions">
                    <button className="npt-confirm-btn npt-confirm-btn--cancel" onClick={onCancel}>
                        {cancelText}
                    </button>
                    <button className="npt-confirm-btn npt-confirm-btn--danger" onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
