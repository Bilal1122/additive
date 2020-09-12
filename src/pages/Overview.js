import React, { useState } from 'react';
import { startCase, concat, map, find, groupBy, filter, keys, isEmpty } from 'lodash';
import { useEffectOnce } from 'react-use';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// components
import Header from 'components/Header';
// api
import { GetDirectSubordinates } from 'actions/employees';

const NameDiv = styled.div`
  cursor: copy;
  :hover {
    color: blue;
  }
`;

function Overview({match, history}) {
  const employeeName = startCase(match?.params?.name);
  let [empTree, setEmpTree] = useState([]);

  console.log(history)
  
  useEffectOnce(() => {
    getEmployeeInfo(employeeName)
  })

  const getEmployeeInfo = (employeeName, parent=null) => {
    GetDirectSubordinates(employeeName, (success, resp) => {
      if(success){
        const data = resp?.data
        if(data){
          empTree = concat(empTree, [{name: employeeName, position: data?.[0], parent: parent}])
          setEmpTree(empTree)
          getSubordinatesInfo(data, employeeName)
        }
      }else{
        alert('Something went wrong')
      }
    })
  }

  const getSubordinatesInfo = (data, parentName) => {
    const subordinates = data && data[1] && data[1]["direct-subordinates"]
    subordinates && map(subordinates, (subordinate) => {
      getEmployeeInfo(subordinate, parentName)
    })
  }

  const copyToClipboard = (name) => {
    const link = `${window.location.origin}/overview/${name}`
    var copy = document.createElement("textarea");
    document.body.appendChild(copy);
    copy.value = link;
    copy.select();
    document.execCommand("copy");
    document.body.removeChild(copy);
    alert('copied succesffully')
  }

  const grouped = groupBy(filter(empTree, 'parent'), 'parent')
  return(
    <>
      <Header text="Employee Overview "/>
      {
        !isEmpty(empTree) ?
          <>
            <p> Subordinates of employee <b>{employeeName} {empTree[0] && `(${empTree[0]?.position})`}</b>: </p>
            {
              map(keys(grouped), (key, i) => (
                <div key={key}>
                  <b>
                    { i > 0 &&
                      <NameDiv onClick={() => copyToClipboard(key)}> 
                        {`${key} (${find(empTree, {name: key}).position})`}
                      </NameDiv>
                    }
                  </b>
                  {
                    grouped[key] && map(grouped[key], (sub) => (
                      !grouped[sub.name] && 
                        <NameDiv onClick={() => copyToClipboard(sub.name)}> 
                          {sub.name} ({sub.position})
                        </NameDiv>
                    ))
                  }
                </div>
              ))
            }
          </>
        :
        <div>
          No Subordinates Available For Employee Name <b>{employeeName}</b>
        </div> 
      }
      <br/>
      <Link to={'/'}> Back to Search </Link>
    </>
  )
}

export default Overview;
