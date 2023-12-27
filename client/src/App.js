import "./App.css";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import img from "./logo2.png";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
export const ex = { existing: null };
function App() {
  const [show, setShow] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const validateEmail = (str) => {
    if (str.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = async () => {
    if (validateEmail(email) &&(email!== ""&&password!== "" )) {
      const res = await fetch("https://e-sec.onrender.com/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
          Max:0,
        }),
      });
      const data = res.json();
      if (!data) {
        window.alert("invalid Authentication");
        console.log("Invalid Authentication");
      } else {
        if (res.status === 400) {
          window.alert("User With That Email Already Exists , Try Again!");
          console.log("User Exists");
        } else {
          handleClose();
          window.alert("User Registered Successfully,You can Login now...");
          console.log("Successfull Registration");
        }
      }
    } 
    else if(email===""|| password==="" )
    {
      window.alert("Please enter the complete details before signing up!")
    }
    else if(!validateEmail(email)){
      window.alert("Please Enter A Valid Email Address!");
    }
  }
  const handleLogin=async () => {
    if (validateEmail(email) &&(email!== ""&&password!== "" )) {
      const res = await fetch("https://e-sec.onrender.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });
      const data = await res.json();
      if (!data) {
        window.alert("invalid Authentication");
        console.log("Invalid Authentication");
      } else {
        if (res.status === 200) {
          console.log(data)
          window.alert(`Welcome ! You Are Now Logged In..`);
          console.log("User logged in successfully");
        } else if (res.status === 400) {
          
          window.alert("Cannot Find Any User Matching The Entered Credentials..! Try again with correct email and password");
          console.log("login failed");
        }
        else if (res.status === 401) {
          
          window.alert("Account Blocked Due to Multiple Wrong Attempts! Account will reactivate after a minute now...");
          console.log("login failed");
        }
        else if (res.status === 402) {
          
          window.alert(data.message);
          console.log("login failed");
        }
      }
    } 
    else if(email===""|| password==="" )
    {
      window.alert("Please enter the complete details before signing in!")
    }
    else if(!validateEmail(email)){
      window.alert("Please Enter A Valid Email Address!");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up Now !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-5">
              <Form.Control
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                type="email"
                placeholder="Email Address"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Control
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                type="password"
                placeholder="Password"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="rounded-3 ms-4"
            variant="primary"
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar expand="md" className="nav" bg="transparent" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={img}
              width="90"
              height="100"
              className="d-inline-block align-top image"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Brand className="logo-text fw-bolder fs-1" href="/">
            E-sec
          </Navbar.Brand>
          <Nav className="ms-auto ">
            <Nav.Link className="mx-3" href="/">
              Home
            </Nav.Link>
            <Nav.Link className="mx-3" href="/">
              Features
            </Nav.Link>
            <Nav.Link className="mx-3" href="/">
              Pricing
            </Nav.Link>
            <Button
              onClick={handleShow}
              variant="primary"
              className="rounded-5 ms-2 "
            >
              Sign Up
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Row style={{ marginTop: "3rem" }}>
        <Col
          className="cont1"
          style={{
            marginTop: "3rem",
            marginBottom: "5rem",
            paddingInline: "4rem",
          }}
        >
          <Stack gap={5}>
            <div className="p-2 px-5 text-center h1 first">
              Welcome to E-Sec
            </div>
            <div className="p-2 text-center h5 second">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni,
              quibusdam. Sit, quas tempora quia officia!
            </div>
            <Button
              onClick={handleShow}
              variant="primary"
              style={{ height: "4.3rem", width: "12rem" }}
              className="rounded-5 mx-auto   "
            >
              Sign Up
            </Button>
          </Stack>
        </Col>
        <Col className=" signin" xs={6}>
          <Card className="mx-auto card" style={{ width: "70%" }} bg="light">
            <Card.Header className="text-center " as="h2">
              Dive In Now
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-5 mx-auto w-75 ">
                  <Form.Control onChange={(e) => {
                  setemail(e.target.value);
                }} type="email" placeholder="Email Address" />
                </Form.Group>
                <Form.Group className="mb-5 mx-auto w-75">
                  <Form.Control onChange={(e) => {
                  setpassword(e.target.value);
                }} type="password" placeholder="Password" />
                </Form.Group>
              </Form>

              {
                <Button onClick={handleLogin} variant="primary" className="rounded-5 ms-5 w-75">
                  Sign In
                </Button>
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default App;
