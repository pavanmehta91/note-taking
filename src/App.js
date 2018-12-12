import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Header from "./Header";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

import { Formik } from "formik";
class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "Hey",
        body: "Hello there"
      },
      {
        id: Date.now() + 1,
        title: "Second",
        body: "This  is a second note"
      }
    ],
    selectedNote: -1
  };
  removeNote = (e, index) => {
    e.stopPropagation();
    const { notes } = this.state;
    this.setState({
      notes: notes.filter((n, i) => i !== index),
      selectedNote: -1
    });
  };
  selectNote = index => {
    const { selectedNote } = this.state;
    this.setState({
      selectedNote: selectedNote === index ? -1 : index
    });
  };
  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    });
  };
  editNote = note => {
    const { selectedNote, notes } = this.state;
    this.setState({
      selectedNote: -1,
      notes: notes.map((n, i) => {
        if (i === selectedNote) {
          return { ...n, ...note };
        }
        return n;
      })
    });
  };
  render() {
    const { notes, selectedNote } = this.state;
    return (
      <div className="App">
        <header>
          <Header />
        </header>
        <Row>
          <Col md="4" xs="12">
            <ListGroup className="min-height border-right">
              {notes.map((n, i) => (
                <ListGroupItem
                  className="pointer"
                  style={selectedNote === i ? { background: "#e4e4e4" } : {}}
                  key={n.id}
                  onClick={() => this.selectNote(i)}
                >
                  <div>{n.title}</div>
                  <div className="muted-text">{n.body}</div>
                  <Button close onClick={e => this.removeNote(e, i)} />
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col md="8" xs="12">
            {selectedNote > -1 ? (
              <Formik
                enableReinitialize
                onSubmit={(values, formikBag) => {
                  formikBag.resetForm();
                  if (values.edit_title === "" || values.edit_body === "") {
                    return;
                  }
                  this.editNote({
                    title: values.edit_title,
                    body: values.edit_body
                  });
                }}
                initialValues={{
                  edit_title: notes[selectedNote].title,
                  edit_body: notes[selectedNote].body
                }}
                render={({ values, handleSubmit, handleChange }) => (
                  <Fragment key={1}>
                    <Form onSubmit={handleSubmit} id="edit_form">
                      <Label for="edit_title">Text</Label>
                      <Input
                        type="text"
                        name="edit_title"
                        id="edit_title"
                        value={values.edit_title}
                        onChange={handleChange}
                        placeholder="Enter Title"
                      />
                      <Label for="edit_body">Body</Label>
                      <Input
                        type="textarea"
                        name="edit_body"
                        id="edit_body"
                        value={values.edit_body}
                        onChange={handleChange}
                        placeholder="Enter Body"
                      />
                      <div className="save-button-container">
                        <Button id="edit_save" color="primary" type="submit">
                          Save
                        </Button>
                      </div>
                      {/* <Button type="button" onClick={resetForm}>
                    Reset
                  </Button> */}
                    </Form>
                  </Fragment>
                )}
              />
            ) : (
              <Fragment key={2}>
                <Formik
                  onSubmit={(values, formikBag) => {
                    formikBag.resetForm();
                    if (values.title === "" || values.body === "") {
                      return;
                    }
                    this.addNote({ ...values, id: Date.now() });
                  }}
                  initialValues={{
                    title: "",
                    body: ""
                  }}
                  render={({ values, handleSubmit, handleChange }) => (
                    <Form onSubmit={handleSubmit} id="add_form">
                      <Label for="title">Text</Label>
                      <Input
                        type="text"
                        name="title"
                        id="title"
                        value={values.title}
                        onChange={handleChange}
                        placeholder="Enter Title"
                      />
                      <Label for="body">Body</Label>
                      <Input
                        type="textarea"
                        name="body"
                        id="body"
                        value={values.body}
                        onChange={handleChange}
                        placeholder="Enter Body"
                      />
                      <div className="save-button-container">
                        <Button color="primary" type="submit">
                          Save
                        </Button>
                      </div>
                      {/* <Button type="button" onClick={resetForm}>
                      Reset
                    </Button> */}
                    </Form>
                  )}
                />
              </Fragment>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
