import React, { useEffect, useState } from "react";
import TableUsers from "../components/TableUsers";
import { Container } from "react-bootstrap";
import AddUserModal from "../components/AddUserModal";
import { ExportToExcelButton, ImportExcelData } from "../services/HandleExcel";
import { useContext } from "react";
import { LogInConText } from "../context/LogInContext";
import { Link } from "react-router-dom";
import LogIn from "./Login";

function ListUsers() {
    const { logInValue } = useContext(LogInConText);
    const [searchKey, setSearchKey] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearchKey(searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    if (!logInValue.account.type || logInValue.account.type === "quest") {
        return (
            <Container className="my-3">
                <h5>You need to log in to access data:</h5>
                <Link className="text-primary" to="/login" element={<LogIn />}>
                    Click to login &#8594;
                </Link>
            </Container>
        );
    }

    return (
        <Container>
            <div className="d-flex  my-2 justify-content-between align-items-center flex-wrap">
                {logInValue.account.type === "admin" && (
                    <>
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
                    </>
                )}
            </div>
            <TableUsers searchKey={searchKey} />
        </Container>
    );
}

export default ListUsers;
