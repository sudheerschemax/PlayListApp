import React, { useEffect, useState } from 'react';
import { PlayListService } from '../../../services/PlayListService';
import { Card, Avatar, Pagination, Row, Col, Button, Tag, Form, Input, Table, Alert, message } from 'antd';
import Meta from 'antd/lib/card/Meta';
export interface CreatePlaylistProps {}
const CreatePlaylist = (props :CreatePlaylistProps) => {
    const libraryServive = new PlayListService();
    const [songsLibrary, setsongsLibrary] = useState([]);
    const [selectedsongsLibrary, setselectedsongsLibrary] = useState([]);
    const [album, setalbum] = useState<string>('');


    useEffect(() => {
        libraryServive.getAllAlbums().then(res =>{
            setsongsLibrary(Array.from(res.values()));
        })
      }, []);

      const onSelectChange =(selectedRowKeys: any, selectedRows: any)=> {
        const data:any = [];
       const Selected = Object.assign({},selectedRows);
             data.push(Selected);
             console.log(data)
      }

      const getPlayList =(e:any)=> {
        setalbum(e.target.value);
      }

       const savePlaylist =()=> {
           const saveData = {
               name : album,
               songs : selectedsongsLibrary
              }
              libraryServive.savePlayLists(saveData).then(res=>{
                message.success(<span>{'PlayList Sucessfully Created, Please Visit Songs Library'}  <Button type="link" icon="close-circle" onClick={() => message.destroy()} /></span>, 8);
                return false
              }).catch((err)=>{
                  console.log(err);
              })
                 
       } 


      const rowSelection = {
           onChange: (selectedRowKeys:any, selectedRows:any) => 
           {  
            const songId:any = [];
            selectedRows.forEach((element:any) => {
                songId.push(element['id'])
            });
            setselectedsongsLibrary(songId);
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows); },
            getCheckboxProps: (record:any) => ({ disabled: record.name === 'Disabled User',  name: record.name, }), 
           
        };
    

      const  handleChange = (pagination: any, filters: any, sorter: any) =>{

      }
     let uniqueId = 0;

      const columns = [
        { 
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
            title: 'Album',
            dataIndex: 'album',
            key: 'album'
        },
        {
            title: 'Album',
            dataIndex: 'artist',
            key: 'artist'
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration'
        }]
      return (
        <div>
            <p>PlayList Name : {album}</p>

         <Form>
         <Form.Item
        label="Play List Name"
        required
      >
        <Input onChange = {getPlayList}/>
        </Form.Item>
         </Form>
         <p> Library of Songs </p>
         <Table
    columns={columns} 
    dataSource={songsLibrary}
    rowSelection={rowSelection}
    bordered 
    rowKey={(record:any) => {
        if (!record.__uniqueId) record.__uniqueId = ++uniqueId;
        return record.__uniqueId;
      }} />
      <Button className = "primary" onClick= {savePlaylist}>Save PlayList</Button>
        </div>
      )


};

export default CreatePlaylist;