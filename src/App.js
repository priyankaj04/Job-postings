import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GetJobs from './api';

// Styled component for the main card container
const Card = styled.div`
  padding: 20px;
  width: 100vw;
  display: flex;
  justify-content:center;
  flex-direction:column;
`;

// Styled component for each job item
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

// Styled component for the apply button
const ApplyButton = styled.button`
  background-color: #407BFF;
  border: none;
  padding: 10px;
  border-radius: 20px;
  color: white;
  cursor: pointer;
`;

// Styled component for the loading message
const LoadingMessage = styled.p`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;

// Styled component for the error message
const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-weight: bold;
`;

// Styled component for the job postings title
const JobPostings = styled.p`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;

const App = () => {
  // State variables for storing job data and loading state
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch job data on component mount
    GetJobs()
      .then((res) => {
        if (res.status === "OK") {
          // If data is fetched successfully, update the jobs state
          setJobs(res.data);
          console.log("job data", res.data);
        } else {
          // If there is an error in fetching data, set the error state
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false)); // Regardless of success or failure, set the loading state to false
  }, []);

  return (
    <Card>
      {loading ? (
        // Display loading message while fetching data
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        <>
          {/* Job postings title */}
          <JobPostings>Job Postings</JobPostings>
          {error ? (
            // Display error message if there is an error in fetching data
            <ErrorMessage>Unable to fetch job data.</ErrorMessage>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {jobs.length > 0 ? (
                // Render job items if jobs data is available
                jobs.map((item) => (
                  <JobItem key={item.job_id}>
                    {/* Job title */}
                    <p style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 0 }}>{item.job_title}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {/* Employer logo */}
                      <img src={item.employer_logo} alt="logo" width="30px" height="30px" style={{ borderRadius: 20 }} />
                      {/* Employer name */}
                      <p style={{ marginTop: 0, textAlign: 'center', fontSize: 14 }}>{item.employer_name}</p>
                    </div>
                    {/* Job location */}
                    <p>Location: {item.job_city}, {item.job_state} - {item.job_country}</p>
                    {/* Job type */}
                    <p>Job type: {item.job_employment_type}</p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {/* Apply button */}
                      <a href={item.job_apply_link} target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}>
                        <ApplyButton>Apply here</ApplyButton>
                      </a>
                    </div>
                  </JobItem>
                ))
              ) : (
                // Display message if no jobs available
                <ErrorMessage>No jobs available.</ErrorMessage>
              )}
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default App;