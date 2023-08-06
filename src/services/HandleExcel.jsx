import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { fetchAllUsers, putUsers } from "./UserService";
import { FaSolidFileExport, FaSolidFileImport } from "../components/icons";
import { Button, Modal, Table } from "react-bootstrap";

export const ExportToExcelButton = (props) => {
    const exportToExcel = async () => {
        const data = await fetchAllUsers();

        const worksheet = XLSX.utils.json_to_sheet(data.users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Dữ liệu");
        const wbout = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "binary",
        });

        const s2ab = (s) => {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) {
                view[i] = s.charCodeAt(i) & 0xff;
            }
            return buf;
        };

        const blob = new Blob([s2ab(wbout)], {
            type: "application/octet-stream",
        });
        saveAs(blob, "list_user.xlsx");
    };

    return (
        <button className="btn btn-primary" onClick={exportToExcel}>
            <FaSolidFileExport className="fs-6 mb-1" /> Export
        </button>
    );
};

export const ImportExcelData = () => {
    const fileRef = useRef(null);
    const [data, setData] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            const isCheck = jsonData.every(
                (el) =>
                    el.hasOwnProperty("id") &&
                    el.hasOwnProperty("first_name") &&
                    el.hasOwnProperty("last_name") &&
                    el.hasOwnProperty("email")
            );

            if (isCheck) {
                setData(jsonData);
                handleShow();
                fileRef.current.value = null;
            } else {
                fileRef.current.value = null;
                window.alert("please choose other file with correct header!");
            }
        };

        reader.readAsBinaryString(file);
    };

    const handleUpdateList = async () => {
        handleClose();
        const res = await putUsers(data);
        window.location.reload();
    };

    return (
        <div>
            <label className="btn btn-warning" htmlFor="file-excel">
                <FaSolidFileImport className="fs-6 mt-1" /> Import
            </label>
            <input
                ref={fileRef}
                hidden
                id="file-excel"
                type="file"
                onChange={handleFileChange}
            />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Do you want to update list by Excel File?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <tbody>
                            {data &&
                                data.length &&
                                data.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.first_name}</td>
                                            <td>{user.last_name}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleUpdateList}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
