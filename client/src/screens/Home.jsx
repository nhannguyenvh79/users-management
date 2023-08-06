import React from "react";
import { Container } from "react-bootstrap";

function HomePage() {
    return (
        <Container className="d-flex flex-column align-items-center my-5">
            <h5>INFORMATION:</h5>

            <p className="mt-5">
                <b>GUEST</b>: Home page only
            </p>
            <p>
                <b>MEMBER</b>: Access user list
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
            <p className="mt-5">
                <b>SIGN UP: </b> Member account only
            </p>
        </Container>
    );
}

export default HomePage;
