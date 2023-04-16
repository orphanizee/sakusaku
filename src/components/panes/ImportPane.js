import React from "react";
import { useDispatch } from "react-redux";
import {
  Header,
  Tab,
  Form,
  Message,
  Button,
  Icon,
  Segment,
} from "semantic-ui-react";
import axios from "axios";
import { importTasks } from "../../reducers/TaskReducer";

const ImportPane = ({
  uploadedFile,
  setUploadedFile,
  importResult,
  setImportResult,
}) => {
  const fileInputRef = React.createRef();
  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault(); // Stop form submit
    fileUpload(uploadedFile);
  };

  const fileChange = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const fileUpload = async (file) => {
    const url = process.env.REACT_APP_API_ENDPOINT;
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      timeout: 5000,
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.put(url, formData, config);

      if (response.status === 200) {
        setImportResult("success");
        const payload = response.data;
        dispatch(importTasks(payload));
      } else {
        setImportResult("failed");
        console.dir(response);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
          // タイムアウトかCORS制限に引っかかった場合、APIが用意されていないとみなしてサンプルデータを読み込む
          const sampleResponse = await axios.get(
            "sample.json"
          );
          const sample = sampleResponse.data;

          dispatch(importTasks(sample));
          setImportResult("sample");
          return;
        }
      }

      setImportResult("failed");
      console.dir(error);
    }
  };

  const handleDismiss = () => {
    setTimeout(() => {
      setImportResult("");
    }, 5000);
  };

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      // 特に何もしない
    } else if (e.type === "dragleave") {
      // 特に何もしない
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <Tab.Pane>
      <Header size="medium">
        CSVファイルからタスク情報をインポートします。
      </Header>
      <Message
        success
        onDismiss={handleDismiss()}
        hidden={importResult !== "success"}
        header="成功"
        content="CSVインポートに成功しました"
      />
      <Message
        success
        onDismiss={handleDismiss()}
        hidden={importResult !== "sample"}
        header="サンプル"
        content="WebAPIが起動していないため、サンプルデータを読み込みました"
      />
      <Message
        negative
        onDismiss={handleDismiss()}
        hidden={importResult !== "failed"}
        header="失敗"
        content="CSVインポートに失敗しました。"
      />
      <Segment
        placeholder
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Header icon>
          <Icon name="file text outline" />
          {uploadedFile === null
            ? "ファイルをドラッグ＆ドロップ"
            : uploadedFile.name}
        </Header>

        <Form onSubmit={onFormSubmit}>
          <Button
            primary
            type="button"
            content="ファイルを選択"
            labelPosition="left"
            icon="file"
            onClick={() => fileInputRef.current.click()}
          />
          <Button
            positive
            type="submit"
            content="実行"
            disabled={uploadedFile === null}
          />
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="text/csv"
            onChange={fileChange}
          />
        </Form>
      </Segment>
    </Tab.Pane>
  );
};

export default ImportPane;
