import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input, Icon } from "semantic-ui-react";
// import { addTask } from "../actions/TaskActions";
import { addTask } from "../reducers/TaskReducer";
import { useSelector, shallowEqual } from "react-redux";

const AddTask = () => {
  const tasks = useSelector((state) => state.tasks, shallowEqual);


  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [estimatedMinute, setEstimatedMinute] = useState(15);
  const [estimatedSecond, setEstimatedSecond] = useState(0);

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };
  const handleEstimatedMinuteChange = (e) => {
    setEstimatedMinute(e.target.value);
  };
  const handleEstimatedSecondChange = (e) => {
    setEstimatedSecond(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    dispatch(addTask(taskName, estimatedMinute, estimatedSecond));
    setTaskName("");
    setEstimatedMinute(15);
    setEstimatedSecond(0);
  };

  return (
    <Form onSubmit={handleAddTask}>
      <div>{tasks}</div>
      <Form.Group>
        <Form.Field
          type="text"
          control={Input}
          label="タスク名"
          placeholder="（例：掃除機かけ）"
          required
          value={taskName}
          onChange={handleTaskNameChange}
        />
        <Form.Field>
          <label>予定工数</label>
          <Input
            type="number"
            label={{ basic: true, content: "分" }}
            labelPosition="right"
            defaultValue={estimatedMinute}
            max="180"
            min="0"
            required
            onChange={handleEstimatedMinuteChange}
          />
        </Form.Field>
        <Form.Field>
          <label>　</label>
          <Input
            type="number"
            label={{ basic: true, content: "秒" }}
            labelPosition="right"
            defaultValue={estimatedSecond}
            max="59"
            min="0"
            required
            onChange={handleEstimatedSecondChange}
          />
        </Form.Field>
        <Form.Field>
          <label>　</label>
          <Button positive>
            <Icon name="plus square outline" type="submit" /> 登録
          </Button>
        </Form.Field>
      </Form.Group>
    </Form>
  );
}

export default AddTask;
