import React from "react";
import { Container } from "semantic-ui-react";
import HeaderExampleSettingsIcon from "./components/ui/Header";
import DescriptionUsage from "./components/ui/DescriptionUsage";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  return (
    <Container>
      <HeaderExampleSettingsIcon />
      <DescriptionUsage />
      <AddTask />
      <TaskList />
    </Container>
  );
}

export default App;
