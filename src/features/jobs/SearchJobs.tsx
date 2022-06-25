import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { MdWork } from 'react-icons/md';
import { GoGlobe } from 'react-icons/go';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useEffect, useState } from 'react';

export default function SearchJobs({setJobDescription,setLocation, search}:any) {
    const [jobDesc,setJobDesc] = useState("");
    const [jobLocation,setJobLocation] = useState("");

    useEffect(()=>{
        setJobDescription(jobDesc)
    },[jobDesc])

    useEffect(()=>{
        setLocation(jobLocation)
    },[jobLocation])
    
    return (
        <div>
            <div className="flex w-full items-center">
                <div className='mr-3 w-1/3'>
                    <div>
                        <label htmlFor=""><b className='text-sm text-gray-600'>Job Description</b></label>
                    </div>
                    <TextField fullWidth variant="outlined" size='small' InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MdWork />
                            </InputAdornment>
                        ),
                    }} placeholder="Filter by title, benefit, companies, expertise" onInput={(value:any)=>{setJobDesc(value.target.value)}}/>
                </div>
                <div className='ml-3 w-1/3'>
                    <div>
                        <label htmlFor=""><b className='text-sm text-gray-600'>Location</b></label>
                    </div>
                    <TextField fullWidth variant="outlined" size='small' InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <GoGlobe />
                            </InputAdornment>
                        ),
                    }} placeholder="Filter by city, state, zip code or country"  onInput={(value:any)=>{setJobLocation(value.target.value)}}/>
                </div>
                <div className='ml-4'>
                    <div>&nbsp;</div>
                    <FormControlLabel control={<Checkbox checked={true} />} label="Full Time Only" />
                </div>
                <div className='ml-4'>
                    <div>&nbsp;</div>
                    <button className='bg-gray-400 py-2 px-5 text-gray-50 rounded hover:opacity-75' onClick={search}><b>Search</b></button>
                </div>
            </div>
        </div>
    )
}