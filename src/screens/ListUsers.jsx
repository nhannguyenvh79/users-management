import React, { useEffect, useState } from "react";
import TableUsers from "../components/TableUsers";
import { Container } from "react-bootstrap";
import AddUserModal from "../components/AddUserModal";

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
      <div className="d-flex my-2 justify-content-between align-items-center">
        <div className="col-3 my-3">
          <input
            type="text"
            placeholder="Search by Email"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <AddUserModal />
      </div>
      <TableUsers searchKey={searchKey} />
    </Container>
  );
}

export default ListUsers;
