import React, { useEffect, useState } from "react";
import TableUsers from "../components/TableUsers";
import { Container } from "react-bootstrap";
import AddUserModal from "../components/AddUserModal";
import { ExportToExcelButton, ImportExcelData } from "../services/HandleExcel";

function ListUsers() {
    const [searchKey, setSearchKey] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearchKey(searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <Container>
            <div className="d-flex  my-2 justify-content-between align-items-center flex-wrap">
                <div className="col-3 my-3 min-w-40 flex-0 ">
                    <input
                        className="p-1  w-100"
                        type="text"
                        placeholder="Search by Email"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                    />
                </div>
                <div className="d-flex gap-2 justify-content-end align-items-center col-8  min-vw-80">
                    <AddUserModal />
                    <div
                        style={{
                            width: 2,
                            backgroundColor: "gray",
                            height: "30px",
                        }}
                    ></div>
                    <ImportExcelData />
                    <ExportToExcelButton />
                </div>
            </div>
            <TableUsers searchKey={searchKey} />
        </Container>
    );
}

export default ListUsers;
