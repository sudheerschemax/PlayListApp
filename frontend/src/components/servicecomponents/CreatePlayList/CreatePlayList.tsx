import React, { useEffect, useState } from "react";
import { PlayListService } from "../../../services/PlayListService";
import {
  Card,
  Avatar,
  Pagination,
  Row,
  Col,
  Button,
  Tag,
  Form,
  Input,
  Table,
  Alert,
  message
} from "antd";
import Meta from "antd/lib/card/Meta";
import { FilterUtil } from "../../../utils/filter-util";
export interface CreatePlaylistProps {}
const CreatePlaylist = (props: CreatePlaylistProps) => {
  const libraryServive = new PlayListService();
  const filterUtil = new FilterUtil();

  const [songsLibrary, setsongsLibrary] = useState([]);
  const [selectedsongsLibrary, setselectedsongsLibrary] = useState([]);
  const [album, setalbum] = useState<string>("");
  const [filtered, setfiltered] = useState([]);
  const [status, setstatus] = useState<boolean>();

  useEffect(() => {
    libraryServive.getAllAlbums().then(res => {
      setsongsLibrary(Array.from(res.values()));
    });
  }, []);

  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    const data: any = [];
    const Selected = Object.assign({}, selectedRows);
    data.push(Selected);
    console.log(data);
  };

  const getPlayList = (e: any) => {
    setalbum(e.target.value);
  };

  const savePlaylist = () => {
    const saveData = {
      name: album,
      songs: selectedsongsLibrary
    };
    libraryServive
      .savePlayLists(saveData)
      .then(res => {
        message.success(
          <span>
            {"PlayList Sucessfully Created, Please Visit Songs Library"}{" "}
            <Button
              type="link"
              icon="close-circle"
              onClick={() => message.destroy()}
            />
          </span>,
          8
        );
        return false;
      })
      .catch(err => {
        console.log(err);
      });
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      const songId: any = [];
      selectedRows.forEach((element: any) => {
        songId.push(element["id"]);
      });
      setselectedsongsLibrary(songId);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === "Disabled User",
      name: record.name
    })
  };

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setstatus(true);
    console.log(filters);
    setfiltered(filters);
  };

  let uniqueId = 0;
  const getFilertitle = filterUtil.getFilters(songsLibrary, "title");
  const getFileralbum = filterUtil.getFilters(songsLibrary, "album");
  const getFilerartist = filterUtil.getFilters(songsLibrary, "artist");

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filters: getFilertitle,
      filteredValue: status ? (filtered ? "" || null : null) : null,
      onFilter: (value: any, record: any) => record.title.includes(value),
      width: 250
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
      filters: getFileralbum,
      filteredValue: status ? (filtered ? "" || null : null) : null,
      onFilter: (value: any, record: any) => record.album.includes(value),
      width: 250
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
      filters: getFilerartist,
      filteredValue: status ? (filtered ? "" || null : null) : null,
      onFilter: (value: any, record: any) => record.artist.includes(value),
      width: 250
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration"
    }
  ];
  return (
    <div>
      <p>PlayList Name : {album}</p>

      <Form>
        <Form.Item label="Play List Name" required>
          <Input onChange={getPlayList} />
        </Form.Item>
      </Form>
      <p> Library of Songs with Filters</p>
      <p>Please Check your favourite song's to Add to the new Playist </p>

      <Table
        columns={columns}
        dataSource={songsLibrary}
        rowSelection={rowSelection}
        onChange={handleChange}
        bordered
        rowKey={(record: any) => {
          if (!record.__uniqueId) record.__uniqueId = ++uniqueId;
          return record.__uniqueId;
        }}
      />
      <Button className="primary" onClick={savePlaylist}>
        Save PlayList
      </Button>
    </div>
  );
};

export default CreatePlaylist;
