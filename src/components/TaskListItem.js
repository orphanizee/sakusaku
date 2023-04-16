import React from 'react'
import { Table } from "semantic-ui-react";
import TaskStatusModal from "./modals/TaskStatusModal";
import TaskEditModal from "./modals/TaskEditModal";
import TaskDeleteModal from "./modals/TaskDeleteModal";

const TaskListItem = ({ task }) => {
  return (
    <Table.Row positive={task.status === "完了"}>
      <Table.Cell textAlign="center">
        <TaskStatusModal task={task} />
      </Table.Cell>
      <Table.Cell>{task.name}</Table.Cell>
      <Table.Cell>
        {("00" + task.estimatedMinute).slice(-2) +
          ":" +
          ("00" + task.estimatedSecond).slice(-2)}
      </Table.Cell>
      <Table.Cell>{task.actualTime}</Table.Cell>
      <Table.Cell>
        {task.progress}%
      </Table.Cell>
      <Table.Cell textAlign="center">
        <TaskEditModal task={task} />
        <TaskDeleteModal task={task} />
      </Table.Cell>
    </Table.Row>
  );
};

export default TaskListItem;
