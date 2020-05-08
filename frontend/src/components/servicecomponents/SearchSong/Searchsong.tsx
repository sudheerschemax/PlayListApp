import React, { useState } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Card,
  Avatar,
  Button,
  Tag,
  message,
  InputNumber
} from "antd";
import Meta from "antd/lib/card/Meta";
import { PlayListService } from "../../../services/PlayListService";

export interface SearchsongProps {}
const SearchSong = (props: SearchsongProps) => {
  const [searchSong, setsearchSong] = useState({});
  const [name, setname] = useState<string>("");
  const [album, setalbum] = useState<string>("");
  const [duration, setduration] = useState<string>("");
  const [artist, setartist] = useState<string>("");
  const [songsresAray, setsongsresAray] = useState([]);
  const [id, setId] = useState<string>("");
  const [Song, setSong] = useState<string>("");

  const libraryServive = new PlayListService();

  const getSong = (e: any) => {
    console.log(e);
    if (!e) {
      message.error(
        <span>
          {"Please Enter song ID"}{" "}
          <Button
            type="link"
            icon="close-circle"
            onClick={() => message.destroy()}
          />
        </span>,
        8
      );
    } else {
      libraryServive
        .getsongbyInput(e)
        .then((res: any) => {
          if (res) {
            setname(res.title);
            setalbum(res.album);
            setduration(res.duration);
            setartist(res.artist);
          } else {
            message.error(
              <span>
                {"No Songs Found"}{" "}
                <Button
                  type="link"
                  icon="close-circle"
                  onClick={() => message.destroy()}
                />
              </span>,
              8
            );
          }
        })
        .catch((err: any) => {
          message.error(
            <span>
              {err}{" "}
              <Button
                type="link"
                icon="close-circle"
                onClick={() => message.destroy()}
              />
            </span>,
            8
          );
        });
    }
  };
  return (
    <div>
      <Form>
        <Form.Item label="Search for a Song By ID" required>
          <InputNumber onChange={getSong} />
        </Form.Item>
      </Form>

      <div className="playlist">
        {
          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={8}>
                <Card style={{ width: 300, marginTop: 16 }} loading={false}>
                  <Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={name}
                    description={album}
                  />
                  <br />
                  <p>Duration : {duration}</p>
                  <p>Artist : {artist}</p>
                </Card>
              </Col>
            </Row>
          </div>
        }
        <br />
      </div>
    </div>
  );
};

export default SearchSong;
