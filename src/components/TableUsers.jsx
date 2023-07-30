import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { fetchUsers } from "../services/UserService";

export default function TableUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await fetchUsers();
    if (response && response.data && response.data.data) {
      setUsers(response.data.data);
    } else {
      console.log("something wrong!");
    }
  };
  console.log(users);
  return (
    <>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gmail</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
