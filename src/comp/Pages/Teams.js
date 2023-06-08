import React, {useState, useEffect} from 'react'
import Team from '../Team/Team'
import supabase from '../../supabase'
import './teams.css'
import {ReactComponent as Thon} from '../../assets/thon-white.svg'
import { BarLoader } from 'react-spinners'
import { postData } from '../modules/PostData'
import {BiSearch} from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Teams = () => {
    const [allTeams,setAllTeams] = useState([]);
    const [search,setSearch] = useState('');
    const [loading,setLoading] = useState(false);
    const [err,setErr] = useState(false);
    async function fetchData(){
        setLoading(true)
        let { data: thon, error } = await supabase
        .from('thon')
        .select('*')
        setAllTeams(thon);

        if (error) {
            setErr(true);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData();
    },[])

    allTeams.sort((a, b) => (a.id > b.id) ? 1 : -1)
    if(err) return <h1>ERROR</h1>
  return (
    <div className='team-loader'>
        {loading ? <div className='bar'>
            <BarLoader className='bar' color='#2BE280' />
        </div>
        :
        <div className='team-wrapper'>
            <div className='temp'>
            <Link to='/'><Thon className='logo'/></Link>
            <h1 className='team-header'>Teams</h1>
            </div>
            <div className='team-container'>
                <div className='team-search'>
                <input className='search-bar' type='text' placeholder='Search Team' onChange={(e) => setSearch(e.target.value)}></input>
                <button className='search-btn' type='button'>
                    <BiSearch/>
                </button>
                </div>
                <div className='all-teams'>
                {
                    allTeams.filter((entry) => {
                        return search.toLowerCase === ''
                        ? entry
                        : entry.team[0].teamName.toLowerCase().includes(search) || entry.id.toString().includes(search);
                    }).map((entry) => {
                        return <Team key={entry.id} entry={entry}/>
                    })
                }
                </div>
                {/* <button type='button' onClick={() => postData(setLoading,allTeams)}>Post Data</button> */}
            </div>
        </div>}
    </div>
  )
}

export default Teams