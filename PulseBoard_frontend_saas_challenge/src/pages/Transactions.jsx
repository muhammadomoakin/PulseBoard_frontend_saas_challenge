import React from "react";
import { Container } from "../components/ui";

const Transactions = () => {
  return (
    <Container className="py-8">
      <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
        Transactions Page
      </h2>
      <p className="text-gray-500 mt-2">
        Manage and view all your transaction history.
      </p>
    </Container>
  );
};

export default Transactions;
