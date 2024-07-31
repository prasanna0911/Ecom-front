import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Card, Typography } from "@mui/material";
import { ApiServices } from "../../api/api";

const Payments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [length, setLength] = useState("");

  const getData = async (page, lim) => {
    var json = {
      page: page,
      limit: lim,
    };
    ApiServices.GetAllProducts(json).then((res) => {
      console.log("res", res);
      if (res.response_code == 200) {
        if (res.Data) {
          setData(res?.Data);
          setLength(res?.Data.length);
        }
      }
    });
  };

  useEffect(() => {
    getData(1, 5);
  }, []);

  const npage = Math.ceil(length / 5);

  const changeCPage = (e, id) => {
    getData(id, 5);
    setCurrentPage(id);
  };

  return (
    <div>
      <Container fluid className="mt-6 px-6">
        <TableContainer component={Card}>
          <Table
            sx={{ minWidth: 650, textWrap: "nowrap" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell className="fw-bolder">Product img</TableCell>
                <TableCell className="fw-bolder">name</TableCell>
                <TableCell className="fw-bolder">category</TableCell>
                <TableCell className="fw-bolder">type</TableCell>
                <TableCell className="fw-bolder">description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((data, k) => (
                <TableRow
                  key={k}
                  // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <img src={data.primaryImage[0].URL} width={40} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.name}
                  </TableCell>
                  <TableCell>{data.category}</TableCell>
                  <TableCell>{data.type}</TableCell>
                  <TableCell>{data.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack spacing={2} mt={5} direction="row" justifyContent="center">
          <Pagination
            count={npage}
            page={currentPage}
            color="primary"
            size="large"
            onChange={changeCPage}
          />
        </Stack>
      </Container>
    </div>
  );
};

export default Payments;
