import React from "react";
import { Container } from "../components/ui";

const Settings = () => {
  return (
    <Container className="py-8">
      <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
        Settings Page
      </h2>
      <p className="text-gray-500 mt-2">
        Adjust your preferences and account settings.
      </p>
    </Container>
  );
};

export default Settings;
