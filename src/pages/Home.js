import React, { useState } from 'react';
// components
import Header from 'components/Header';
import TextField from 'components/TextField';
import Button from 'components/Button';

function Home({history}) {
  const [search, setSearch] = useState('');

  const searchHandler = () => {
    if(!search) return alert('search field is empty')
    history.push(`overview/${search}`)
  };
  
  return(
    <>
      <Header text="Employee Explorer"/>
      <div className='flex'>
        <TextField value={search} onChange={setSearch}/>
        <Button text='Search' onClick={searchHandler}/>
      </div>
    </>
  )
}

export default Home;