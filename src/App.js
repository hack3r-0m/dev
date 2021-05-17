import React, { Component } from "react";

/* BOOTSTRAP IMPORTS */
//Layouts
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//CSS edits
import 'bootstrap/dist/css/bootstrap.min.css';
import './design.css';

//REBASS STYLES
import {
  Button,
  Text
} from 'rebass';
import preset from '@rebass/preset';
import Web3 from 'web3';
import { abiCTF } from './abi.js';

//GSN TEST BASED ADDRESS
const contractAddress = "0xBEDfAAd294Ad8a5979D6Fc081f1239f1643A60ee";
const trustedForwarder = "0x956868751Cc565507B3B58E53a6f9f41B56bed74";
const paymaster = "0x43d66E6Dce20264F6511A0e8EEa3f570980341a2";


/* 
GSN RELATED FUNCTIONS
*/
const { RelayProvider } = require('@opengsn/gsn');


export default class App extends Component {
  constructor(props) {
    super(props);
    this.accounts = "";
    this.useGSN = this.useGSN.bind(this);
    //Set State
    this.state = {
      SignatureRequest: "",
    }
  }

  componentDidMount = async () => {
    //this.setupLoader();
    this.initateEthereum = this.initateEthereum.bind(this);
    this.initateEthereum();
  }


initateEthereum = async () => {
  if (typeof window.web3 !== 'undefined') {
        //const that = this;
        this.setState({percentageLoader: "Web3 Sign-In"});
        await window.web3.currentProvider.enable();
        this.getEthereumAccount = this.getEthereumAccount.bind(this);
        this.getEthereumAccount();         
        
    } else {
      console.log("Metamask not detected or installed.")
    }
  }

  getEthereumAccount = async () => {
    if (window.web3.currentProvider.selectedAddress !== null) {
        var web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        //this.setState({web3, accounts});
        //
        const configuration = { relayHubAddress: "0x53C88539C65E0350408a2294C4A85eB3d8ce8789", 
        stakeManagerAddress: "0x6ef9595244c2Cd9BD89af56607283784b5a9499C" };

        const provider = new RelayProvider(web3.currentProvider, configuration);
        web3 = new Web3(provider);
        const GSNcontract = await new web3.eth.Contract(abiCTF, contractAddress);

        this.setState({GSNcontract, accounts, web3});
    }
  }


  useGSN = async () => {
        await this.state.GSNcontract.methods.captureTheFlag().send({ from: paymaster, trustedForwarder});
  }


  render () {
  return (
    <>
        
     <Container fluid className={this.state.bodyLoaderCSS}>
      <Row>
      <Col md={2}>
      </Col>
      <Col md={8}>
            <Container className="text-center bottomofPage">
                <Row>
                  <Col md={3}>
                  </Col>
                  <Col md={6} className="text-center">
                  <br />
                  <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  <Text className="headerText"
                    fontSize={[ 3, 4, 5 ]}
                    fontWeight='bold'>
                    GSN Test
                  </Text>
                  <br />
                  </Col>
                  <Col md={3}>
                  </Col>
                  </Row>

                    <Row>
                      <Col md={4}>
                      </Col>
                      <Col md={4}>
                      <Button className="bottomButton buttonFormat" theme={preset} variant='outline' onClick={this.useGSN}>Use GSN</Button>
                      </Col>
                      <Col md={4}>
                      </Col>
                    </Row>
            </Container>
      </Col>
      <Col md={2}>
      </Col>
      </Row>
      </Container>

  </>
  );
}
}

