import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form, Progress, Icon, Popup } from "semantic-ui-react";
import { updateTask } from "../../reducers/TaskReducer";

const TaskStatusModal = ({ task }) => {
  const [open, setOpen] = React.useState(false);

  const array = task.actualTime.split(":");
  const hourSec = Number(array[0]) * 60 * 60;
  const minSec = Number(array[1]) * 60;
  const sec = Number(array[2]);
  const initialSeconds = hourSec + minSec + sec;

  const [actualTime, setActualTime] = useState(task.actualTime);
  const [actualTimeSeconds, setActualTimeSeconds] = useState(initialSeconds);
  const [progress, setProgress] = useState(task.progress);
  const [status, setStatus] = useState(task.status);
  const intervalRef = useRef(null);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
    setStatus("実行中");
    startCount();
  };

  const handleClose = () => {
    clearInterval(intervalRef.current);
    setActualTime(task.actualTime);
    setActualTimeSeconds(initialSeconds);
    setProgress(task.progress);
    setStatus(task.status);
    setOpen(false);
  };

  const handleSave = () => {
    clearInterval(intervalRef.current);
    setStatus("停止中");

    const payload = {
      id: task.id,
      actualTime: actualTime,
      progress: progress,
      status: status,
    };
    dispatch(updateTask(payload));

    setOpen(false);
  };

  const handleProgressChange = (e) => {
    setProgress(e.target.value);
  };

  const startCount = () => {
    intervalRef.current = setInterval(() => {
      setActualTimeSeconds((actualTimeSeconds) => actualTimeSeconds + 1);
    }, 1000);
  };

  useEffect(() => {
    setActualTime(formattedActualTime());
  }, [actualTimeSeconds]);

  useEffect(() => {
    if (open) {
      setStatus(progress === "100" ? "完了" : "実行中");
    } else {
      setStatus(progress === "100" ? "完了" : "停止中");
    }
  }, [open, progress]);

  const formattedActualTime = () => {
    const seconds = actualTimeSeconds % 60;
    const minutes = Math.floor(actualTimeSeconds / 60) % 60;
    const hours = Math.floor(actualTimeSeconds / 3600);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={handleOpen}
      open={open}
      closeOnDimmerClick={false}
      trigger={
        status === "実行中" ? (
          <Popup
            trigger={
              <Button basic icon onClick={handleOpen}>
                <Icon name="pause" color="green" size="large" />
              </Button>
            }
            content="実行中…"
            position="top left"
          />
        ) : status === "停止中" ? (
          <Popup
            trigger={
              <Button basic icon onClick={handleOpen}>
                <Icon name="play" color="orange" size="large" />
              </Button>
            }
            content="実行！"
            position="top left"
          />
        ) : (
          <Popup
            trigger={
              <Button basic icon onClick={handleOpen}>
                <Icon name="check square" color="blue" size="large" />
              </Button>
            }
            content="完了！"
            position="top left"
          />
        )
      }
    >
      <Modal.Header>{task.name} を実行中！</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>実績工数</label>
            <input
              type="text"
              value={actualTime}
              readOnly
              style={{ backgroundColor: "#f9f9f9" }}
            />
          </Form.Field>
          <Form.Field>
            <label>進捗率</label>
            <Progress percent={progress} indicating progress size="medium" />
          </Form.Field>
          <Form.Field>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              style={{ width: "100%" }}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button primary onClick={handleSave}>
          保存
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default TaskStatusModal;
