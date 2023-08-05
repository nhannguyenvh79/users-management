import React from "react";
import { Container } from "react-bootstrap";

function HomePage() {
    return (
        <Container className="d-flex flex-column align-items-center my-5">
            <h5>`cd backend` , `npm run dev` to run backend server</h5>

            <p className="mt-5">
                <b>GUEST</b>: just see Home Page
            </p>
            <p>
                <b>MEMBER</b>: need sign up account, sign in this account to
                access user list
            </p>
            <p>
                <b>ADMIN</b>: "CRUD" user list, export-import excel file
            </p>
            <p className="mt-5">
                <b>MEMBER ACCOUNT: </b>member.react@gmail.com - 12345
            </p>
            <p>
                <b>ADMIN ACCOUNT: </b>admin.react@gmail.com - 12345
            </p>
        </Container>
    );
}

export default HomePage;
