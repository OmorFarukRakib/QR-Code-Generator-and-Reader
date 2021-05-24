import React, { useState, useRef } from "react";
import {
  Container,
  Card,
  CardContent,
  Button,
  makeStyles,
  TextField,
  Grid,
} from "@material-ui/core";
import QRcode from "qrcode";
import QRReader from "react-qr-reader";

function App() {
  const [text, setText] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCamFile, setScanResultWebCamFile] = useState("");
  const qrRef = useRef(null);
  const classes = useStyles();

  const generateQRCode = async () => {
    try {
      const response = await QRcode.toDataURL(text);
      setImageURL(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };

  const handleErrorWebCamFile = (error) => {
    console.log(error);
  };
  const handleScanWebCamFile = (result) => {
    if (result) {
      setScanResultWebCamFile(result);
    }
  };

  return (
    <Container className={classes.container}>
      <Card>
        <h2 className={classes.title}>
          Generate QR code to download and Scan QR code
        </h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField
                label="Enter text here: "
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={() => generateQRCode()}
              >
                Generate QR
              </Button>
              <br />
              <br />
              <br />
              {imageURL ? (
                <a href={imageURL} download>
                  <img src={imageURL} alr="img" />
                </a>
              ) : null}
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Button
                variant="contained"
                color="secondary"
                onClick={onScanFile}
              >
                Scan QR code by image
              </Button>
              <QRReader
                ref={qrRef}
                delay={300}
                style={{ width: "100%" }}
                onError={handleErrorFile}
                onScan={handleScanFile}
                legacyMode
              />
              <h3>
                Scanned Code: <a href={scanResultFile}>{scanResultFile}</a>
              </h3>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h3>QR Code Scanned by Web Cam</h3>
              <QRReader
                delay={300}
                style={{ width: "100%" }}
                onError={handleErrorWebCamFile}
                onScan={handleScanWebCamFile}
              />
              <h3>
                The Scanned QR code is:{" "}
                <a href={scanResultWebCamFile}>{scanResultWebCamFile}</a>
              </h3>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#3f51b5",
    color: "#fff",
    padding: 20,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
}));
export default App;
