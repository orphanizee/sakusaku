import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Table,
  Icon,
  Segment,
  Divider,
  Header,
  Button,
  Tab,
} from "semantic-ui-react";
import TaskListItem from "./TaskListItem";
import { exportTasks } from "../reducers/TaskReducer";
import DescriptionPane from "./panes/DescriptionPane";
import ImportPane from "./panes/ImportPane";

const TaskList = () => {
  const tasks = useSelector((state) => state.taskManager.tasks);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [importResult, setImportResult] = useState("");
  const dispatch = useDispatch();

  const handleExport = () => {
    dispatch(exportTasks());
  };

  const panes = [
    {
      menuItem: {
        key: "description",
        icon: "info",
        content: "このアプリについて",
      },
      render: DescriptionPane,
    },
    {
      menuItem: {
        key: "taskList",
        icon: "list",
        content: "タスク一覧",
      },
      render: () => (
        <Tab.Pane>
          <Segment>
            <Divider horizontal>
              <Header as="h4">
                <Icon name="check circle outline" />
                タスク一覧
              </Header>
            </Divider>
            <Button primary onClick={handleExport}>
              CSVエクスポート
            </Button>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>タスク実行ボタン</Table.HeaderCell>
                  <Table.HeaderCell>タスク名</Table.HeaderCell>
                  <Table.HeaderCell>予定工数</Table.HeaderCell>
                  <Table.HeaderCell>実績工数</Table.HeaderCell>
                  <Table.HeaderCell>進捗率</Table.HeaderCell>
                  <Table.HeaderCell>操作</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {tasks.map((task) => (
                  <TaskListItem key={task.id} task={task} />
                ))}
              </Table.Body>
            </Table>
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: "import",
        icon: "upload",
        content: "CSVからタスクをインポート",
      },
      render: () => (
        <ImportPane
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          importResult={importResult}
          setImportResult={setImportResult}
        />
      ),
    },
  ];

  if (tasks == null || tasks.length === 0) {
    panes[1].render = () => (
      <Segment>
        <Divider horizontal>
          <Header as="h4">タスクがありません。</Header>
        </Divider>
      </Segment>
    );
  }

  return <Tab panes={panes} defaultActiveIndex={1} />;
};

export default TaskList;
