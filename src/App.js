import React from 'react';
// import { Button } from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Row, Col, Container, Button, Form, ButtonGroup, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getData, setData, filterData } from './redux/action/action';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Description: '',
      Venue: '',
      Price: '',
      Discount: '',
    }
  }
  createEvent = (event) => {
    event.preventDefault();
    let x = 0;
    if (isNaN(this.state.Price) || this.state.Price === '') {
      this.setState({ validatePrice: 1 })
      x = 1;
    }
    if (isNaN(this.state.Discount)) {
      this.setState({ validateDiscount: 1 })
      x = 1;
    }
    if (this.state.Name === '') {
      x = 1;
      this.setState({ validateName: 1 })
    }
    if (this.state.Description === '') {
      x = 1
      this.setState({ validateDescription: 1 })
    }
    if (this.state.Venue === '') {
      x = 1;
      this.setState({ validateVenue: 1 })
    }
    if (!x && (parseInt(this.state.Price) < parseInt(this.state.Discount)))
      // console.log(this.state.price + 'and' + this.state.discount)
      alert('dise valusconut should be less than pric');
    else if (!x) {
      let list1 = [];
      if (localStorage.getItem('elist') === null || localStorage.getItem('elist') === undefined) {
        list1 = [];
      }
      else {
        list1 = JSON.parse(localStorage.getItem('elist'));
      }

      list1.push({
        ename: this.state.Name,
        edesc: this.state.Description,
        evenue: this.state.Venue,
        eprice: this.state.Price,
        ediscount: this.state.Discount || "0",
      })
      // localStorage.setItem('elist', JSON.stringify(list1));
      // this.setState({
      //   eventList: [...list1],
      // })
      this.props.setData1(list1);

      this.clearFields();
    }

  }


  onChangehandler = event => {
    let x = event.target.name;
    let valx = "validate" + x;
    this.setState({
      [x]: event.target.value,
      [valx]: 0
    })
  }

  componentDidMount() {
    // const list = JSON.parse(localStorage.getItem('elist'));
    // if (list !== null)
    //   this.setState({ eventList: list })
    console.log("chaladidmoutn");
    this.props.getData1();
  }

  clearFields = () => {
    this.setState({
      Name: '',
      Description: '',
      Venue: '',
      Price: '',
      Discount: ''
    })
  }

  filterList = (event) => {
    let list = JSON.parse(localStorage.getItem('elist'));
    if (list !== null) {

      if (event.target.id === 'All') {
        // this.setState({
        //   eventList: [...list]
        // })
        this.props.filterData1(list);
      }
      else if (event.target.id === 'Discount') {
        const l1 = list.filter(item => item.ediscount !== "0")
        // this.setState({
        //   eventList: [...l1]
        // })
        this.props.filterData1(l1);
      }
      else if (event.target.id === 'free') {
        const l1 = list.filter(item => item.eprice === "0")
        // this.setState({
        //   eventList: [...l1]
        // })
        this.props.filterData1(l1);
      }
      else if (event.target.id === 'NoDiscount') {
        const l1 = list.filter(item => item.ediscount === "0")
        // this.setState({
        //   eventList: [...l1]
        // })
        this.props.filterData1(l1);
      }
    }
  }

  render() {
    return (
      < div className="divstyle">
        <header>
          <Container >
            <Row>
              <Col xs={8}>
                <Row>
                  <ButtonGroup>
                    <Button id="All" onClick={this.filterList}>All</Button>&nbsp;&nbsp;
                    <Button id="Discount" onClick={this.filterList}>Discount</Button>&nbsp;&nbsp;
                    <Button id="NoDiscount" onClick={this.filterList}>No Discount</Button>&nbsp;&nbsp;
                  <Button id="free" onClick={this.filterList}>free</Button>&nbsp;&nbsp;
                  </ButtonGroup>
                </Row>
                <Row >
                  <h1 style={{ textAlign: "center" }}>
                    Events
                </h1>
                </Row>
                <Row>
                  {this.props.eventData1 && this.props.eventData1.map(items => {

                    return (<>
                      <br />
                      <Card style={{ width: '18rem' }}>
                        <Card.Body>
                          <Card.Title>Event name:{items.ename}</Card.Title>
                          <Card.Text>
                            DESCRIPTION:{items.edesc}
                          </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                          <ListGroupItem>VENUE:{items.evenue}</ListGroupItem>
                          <ListGroupItem>PRICE:{items.eprice}</ListGroupItem>
                          <ListGroupItem>DISCOUNT:{items.ediscount}</ListGroupItem>
                        </ListGroup>
                      </Card>
                    </>
                    )
                  })}

                </Row>
              </Col>
              <Col>
                <Form>
                  <Form.Group noValidate controlId="name" >
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control type="text" name="Name" value={this.state.Name} placeholder="Enter Event Name" onChange={this.onChangehandler} />
                    {this.state.validateName ? <div style={{ 'color': 'red' }}>Please enter Event Name</div> : null}

                  </Form.Group>
                  <Form.Group controlId="descriptions">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="Description" value={this.state.Description} onChange={this.onChangehandler} placeholder="Description" />
                    {this.state.validateDescription ? <div style={{ 'color': 'red' }}>Please enter description</div> : null}

                  </Form.Group>
                  <Form.Group controlId="venue">
                    <Form.Label>Venue</Form.Label>
                    <Form.Control type="text" name="Venue" value={this.state.Venue} onChange={this.onChangehandler} placeholder="Venue" />
                    {this.state.validateVenue ? <div style={{ 'color': 'red' }}>Please enter Venue</div> : null}

                  </Form.Group>
                  <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" name="Price" value={this.state.Price} onChange={this.onChangehandler} placeholder="Price" />
                    {this.state.validatePrice ? <div style={{ 'color': 'red' }}>Invalid price</div> : null}
                  </Form.Group>
                  <Form.Group controlId="discount">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control type="text" name="Discount" value={this.state.Discount} onChange={this.onChangehandler} placeholder="Discount" />
                    {this.state.validateDiscount ? <div style={{ 'color': 'red' }}>Invalid Discount</div> : null}

                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={this.createEvent}>
                    Submit
               </Button>{" "}
                  <Button variant="primary" type="button" onClick={this.clearFields}>
                    Reset
                </Button>

                </Form>
              </Col>
            </Row>
          </Container>

        </header>
        <footer className="footer">
          <p>Developed By:Deepali Gupta</p>
        </footer>
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  console.log("staetto props" + state);
  return {
    eventData1: state.eventData
  }
}
const mapDispatchToProps = (dispatch) => {
  console.log("dispatchfuncto" + dispatch);
  return {
    getData1: () => dispatch(getData()),
    setData1: (x) => dispatch(setData(x)),
    filterData1: (x) => dispatch(filterData(x))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
