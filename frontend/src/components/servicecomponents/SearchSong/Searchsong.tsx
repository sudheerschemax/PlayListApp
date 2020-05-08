import React, { useState } from "react"
import { Form, Input, Row, Col, Card, Avatar, Button, Tag, message } from "antd"
import Meta from "antd/lib/card/Meta";
import { PlayListService } from "../../../services/PlayListService";


export interface SearchsongProps {}
const SearchSong = (props :SearchsongProps) => {
    const [searchSong, setsearchSong] = useState({});
    const [name, setname] = useState<string>('');
    const [songsresAray, setsongsresAray] = useState([]);
    const [id, setId] = useState<string>('');
    const [Song, setSong] = useState<string>('');

    const libraryServive = new PlayListService();

 
    const getSong =(e:any)=> {
        console.log(e.target.value);
        libraryServive.getsongbyInput(e.target.value).then((res:any)=>{
           const songsArray:any = [];
            setId(res.id);
            setname(res.name);
            res.songs.forEach((res:any)=>{
                songsArray.push(res);
            })
            setsongsresAray(songsArray);

        }).catch((err:any)=>{
            message.success(<span>{err}  <Button type="link" icon="close-circle" onClick={() => message.destroy()} /></span>, 8);

        })
      }
 return(
    <div>
      <Form>
         <Form.Item
        label="Search for a Song"
        required
      >
        <Input onChange = {getSong}/>
        </Form.Item>
         </Form> 

         <div  className= "playlist">
          {
            <div className="site-card-wrapper">
               <Row>
                 <Col span={16}>
                   <Card bordered={true} style={{ width: 500}}>
                    <p>Title : {name} </p>
                    <p>Id : {id} </p>
                   </Card>
                   <p>Songs List </p>
                   <div className="site-card-wrapper">  
               {songsresAray.map((ressong:any)=>{
                     return (<Tag color="magenta">{ressong}</Tag>)
               }) }
                 </div>
                </Col>
               </Row>
             </div>
             
              
               
           }
            <br/>
          </div>
    </div>  

     
 )

}

export default SearchSong;