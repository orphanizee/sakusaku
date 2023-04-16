import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Icon, Popup } from "semantic-ui-react";
import { deleteTask } from "../../reducers/TaskReducer";

const TaskDeleteModal = ({ task }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    setOpen(false);
  };

  return (
    <Modal
      size="tiny"
      open={open}
      onOpen={handleOpen}
      onClose={() => setOpen(false)}
      closeOnDimmerClick={false}
      trigger={
        <Popup
          trigger={
            <Button basic icon onClick={handleOpen}>
              <Icon name="trash alternate outline" />
            </Button>
          }
          content="タスクを削除"
          position="top center"
        />
      }
    >
      <Modal.Header>タスクを削除する</Modal.Header>
      <Modal.Content>
        <p>{`以下のタスクを削除します。よろしいですか？`}</p>
        <p>{`タスク名：${task.name}`}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>いいえ</Button>
        <Button negative onClick={handleDelete}>
          はい
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default TaskDeleteModal;
