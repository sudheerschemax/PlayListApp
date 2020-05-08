import React, { useEffect, useState } from 'react';
import { PlayListService } from '../../../services/PlayListService';
import { Card, Avatar, Pagination, Row, Col, Button, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
export interface PlaylistProps {}

const Playlist = (props :PlaylistProps) => {
const [songsLibrary, setsongsLibrary] = useState([]);
const [songsPlayList, setsongsPlayList] = useState([]);
const libraryServive = new PlayListService();
const [minValue, setminValue] = useState<number>(0);
const [maxValue, setmaxValue] = useState<number>(9);

 
    useEffect(() => {
        libraryServive.getAllAlbums().then(res =>{
            setsongsLibrary(res);
        })
      }, []);

    useEffect(() => {
        libraryServive.getPlayLists().then(res =>{
            console.log(res);
            setsongsPlayList(res);
        })
      }, []);
 

    return (
        <div className="site-card-wrapper" >
            <p>Song's Library : </p>
            <div className= "songs">
           {
               songsLibrary.map((res:any)=>{
               return (<div className="site-card-wrapper"><Row gutter={16}><Col span={8}><Card style={{ width: 300, marginTop: 16 }} loading = {false}>
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={res.title}
                  description= {res.album}
                />
                <br/>
                <p>Duration : {res.duration}</p>
                <p>Artist : {res.artist}</p>
                <Button>Add Song to PlayList</Button>
              </Card></Col>
              </Row></div>
              )
               
               })
           }
           </div>
           <p>Available PlayLists :</p>
          <div  className= "playlist">
          {
               songsPlayList.map((response:any)=>{
                   console.log(response);
               return (<div className="site-card-wrapper">
               <Row>
                 <Col span={8}>
                   <Card bordered={true} style={{ width: 500, marginTop : 36}}>
                    <p>Title :</p> {response.name}
                   </Card>
                   <p>Songs :</p>
                   <div className="site-card-wrapper">
               {response.songs.map((ressong:any)=>{
                     return (<Tag color="magenta">{ressong}</Tag>)
               }) }
                 </div>
                </Col>
               </Row>
             </div>
             
              )
               })
           }
            <br/>
          </div>
        </div>
    );
}; 


export default Playlist;