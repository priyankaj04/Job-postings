import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GetJobs from './api';

const Card = styled.div`
  padding: 20px;
  width: 100vw;
  display: flex;
  justify-content:center;
  flex-direction:column;
`;

const JobItem = styled.div`
  background-color: #f5f5f5;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
  width: 270px;
  height: 200px;
  padding: 10px;
`;

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetJobs().then((res) => {
      if (res.status === "OK") {
        setJobs(res.data);
        console.log("job data", res.data);
        setLoading(false);
      } else {
        setJobs([]);
      }
    });
  }, []);

  return (
    <Card>
      {loading ? (
        "Loading..."
      ) : (<>
        <p style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Job Postings</p>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {jobs && jobs.length > 0 ? (
            jobs.map((item) => (
              <JobItem key={item.job_id}>
                <p style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 0 }}>{item.job_title}</p>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <img src={item.employer_logo} alt="logo" width="30px" height="30px" style={{borderRadius: 20}} />
                  <p style={{ marginTop: 0, textAlign: 'center', fontSize: 14 }}>{item.employer_name}</p>
                </div>
                <p>Location: {item.job_city}, {item.job_state} - {item.job_country}</p>
                <p>Job type: {item.job_employment_type}</p>
                <div style={{display:'flex', justifyContent:'center'}}>
                  <a href={item.job_apply_link} target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}><button style={{ backgroundColor: '#407BFF', border: 'none', padding: 10, borderRadius: 20, color: 'white', cursor: 'pointer' }}>Apply here</button></a>
                </div>
              </JobItem>
            ))
          ) : (
            "No jobs available."
          )}
        </div>
      </>
      )}
    </Card>
  );
};

export default App;