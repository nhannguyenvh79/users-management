import { memo, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { fetchUsers } from "../services/UserService";
import ReactPaginate from "react-paginate";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import { FaSolidSort } from "./icons";
import { Link, useNavigate } from "react-router-dom";
import LogIn from "../screens/Login.jsx";
import { useContext } from "react";
import { LogInConText } from "../context/LogInContext";

function TableUsers(props) {
    const [users, setUsers] = useState([]);
    const { logInValue } = useContext(LogInConText);

    const [totalUsers, setTotalusers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    useEffect(() => {
        getUsers();
    }, [currentPage, sortBy, sortField, props.searchKey]);

    const getUsers = async () => {
        try {
            const res = await fetchUsers(
                currentPage,
                sortBy,
                sortField,
                props.searchKey
            );
            if (res && res.data) {
                setUsers(res.data);
                setTotalPages(res.totalPages);
                setTotalusers(res.total);
                setIsLoading(false);
            }
        } catch (error) {
            setError(`${error.response.data.message}! please login again`);
            setIsLoading(false);
        }
    };

    const handlePageClick = (e) => {
        setCurrentPage(+e.selected + 1);
    };

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
    };

    const reloadTable = () => {
        getUsers(currentPage, sortBy, sortField, props.searchKey);
    };

    if (error) {
        return (
            <>
                <div className="text-danger">
                    Something went wrong: {error}!
                </div>
                <Link className="text-primary" to="/login" element={<LogIn />}>
                    Click to login &#8594;
                </Link>
            </>
        );
    }

    return (
        <>
            {isLoading ? (
                <Spinner animation="border" />
            ) : (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    <div
                                        className="d-flex justify-content-between align-items-center"
                                        onClick={() => {
                                            sortBy === "asc"
                                                ? handleSort("desc", "id")
                                                : handleSort("asc", "id");
                                        }}
                                    >
                                        ID
                                        <FaSolidSort />
                                    </div>
                                </th>
                                <th>
                                    <div
                                        className="d-flex justify-content-between align-items-center"
                                        onClick={() => {
                                            sortBy === "asc"
                                                ? handleSort(
                                                      "desc",
                                                      "first_name"
                                                  )
                                                : handleSort(
                                                      "asc",
                                                      "first_name"
                                                  );
                                        }}
                                    >
                                        First Name
                                        <FaSolidSort />
                                    </div>
                                </th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users &&
                                users.length &&
                                users.map((user) => {
                                    return (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.first_name}</td>
                                            <td>{user.last_name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {logInValue.account.type ===
                                                    "admin" && (
                                                    <>
                                                        <EditUserModal
                                                            userId={user._id}
                                                            firstName={
                                                                user.first_name
                                                            }
                                                            lastName={
                                                                user.last_name
                                                            }
                                                            email={user.email}
                                                            reloadTable={
                                                                reloadTable
                                                            }
                                                        />
                                                        <DeleteUserModal
                                                            userId={user._id}
                                                            firstName={
                                                                user.first_name
                                                            }
                                                            lastName={
                                                                user.last_name
                                                            }
                                                            email={user.email}
                                                            reloadTable={
                                                                reloadTable
                                                            }
                                                        />
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=" >"
                        previousLabel="< "
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={4}
                        pageCount={totalPages}
                        renderOnZeroPageCount={null}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        marginPagesDisplayed={2}
                        containerClassName="pagination"
                        activeClassName="active"
                    />
                </>
            )}
        </>
    );
}

export default memo(TableUsers);
