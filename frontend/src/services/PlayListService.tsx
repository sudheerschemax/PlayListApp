import axios from 'axios';
import { host } from './environment';


export class PlayListService  {

    URL = host.URL;
    async  getAllAlbums() :Promise<any>{
            return await axios.get(this.URL + 'library')
                .then(res => {
                    return res.data
     })
    } 

    async  getPlayLists() :Promise<any>{
        return await axios.get(this.URL + 'playlist')
            .then(res => {
                return res.data
 })
} 

async  savePlayLists(data:any) :Promise<any>{
    return await axios.post(this.URL + 'playlist',data)
        .then(res => {
            return res.data
})
}  

async  getsongbyInput(datainput:any) :Promise<any>{
    return await axios.get(this.URL + 'library/'+datainput)
        .then(res => {
            return res.data
})
} 



}