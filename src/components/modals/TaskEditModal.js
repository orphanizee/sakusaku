import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Form, Button, Icon, Popup } from "semantic-ui-react";
import { editTask } from "../../reducers/TaskReducer";

const TaskEditModal = ({ task }) => {
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState(task.name);
  const [estimatedMinute, setEstimatedMinute] = useState(task.estimatedMinute);
  const [estimatedSecond, setEstimatedSecond] = useState(task.estimatedSecond);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setName(task.name);
    setEstimatedMinute(task.estimatedMinute);
    setEstimatedSecond(task.estimatedSecond);
    setOpen(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEstimatedMinuteChange = (e) => {
    setEstimatedMinute(e.target.value);
  };
  const handleEstimatedSecondChange = (e) => {
    setEstimatedSecond(e.target.value);
  };

  const handleSave = () => {
    const payload = {
      id: task.id,
      name: name,
      estimatedMinute: estimatedMinute,
      estimatedSecond: estimatedSecond,
    };
    dispatch(editTask(payload));
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onOpen={handleOpen}
      onClose={() => setOpen(false)}
      closeOnDimmerClick={false}
      trigger={
        <Popup
          trigger={
            <Button basic icon onClick={handleOpen}>
              <Icon name="edit" color="teal" />
            </Button>
          }
          content="タスクを編集する"
          position="left center"
        />
      }
    >
      <Modal.Header>タスクを編集する</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            label="タスク名"
            placeholder="タスク名を入力してください"
            value={name}
            onChange={handleNameChange}
          />
          <Form.Group inline>
            <label>予定工数</label>
            <Form.Input
              type="number"
              value={estimatedMinute}
              onChange={handleEstimatedMinuteChange}
              min="0"
              max="999"
              label="分"
            />
            <Form.Input
              type="number"
              value={estimatedSecond}
              onChange={handleEstimatedSecondChange}
              min="0"
              max="59"
              label="秒"
            />
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => handleClose(false)}>キャンセル</Button>
        <Button primary onClick={handleSave}>
          更新する
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default TaskEditModal;
