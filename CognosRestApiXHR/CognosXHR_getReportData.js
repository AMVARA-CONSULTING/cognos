/**
 * This is a very basic sample implementation to retrieve data via XHR (vanialla JS) from a IBM Analytics with Watson X server
 * 
 * 1. Ask Server for Report Versions URLs
 * 2. Ask Server for Reports Versions Saved formats URLs with URL from 1
 * 3. Finally Ask Server for Data with URL from 2
 * 
 * You should add error handling to understand 3xx, 4xx, 5xx return codes
 * 200 Return code might deliver data that is not well formatted.
 * 
 * Use this code as a comfortable starting point to understand, the request flow.
 * 
 * AMVARA CONSULTING, Ralf Roeber, 13th August 2023
 *  
 */


// Define the IBM Analytics with Watson X endpoint URL
const endpoint = 'https://cognosdemo/crn0/bi/v1';

// Sample Boston Data Report - replace the ID with a Report ID from your Server
const report_versions = endpoint+'/objects/i4C2A888954E4426DB23DEC77A2101B71/versions?fields=creationTime'

// Convinience Function to log console output with timestamp
function logWithTimestamp(message, ...args) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`, ...args);
}

// Extract XSRF token from cookies and store it in a variable
function getXsrfToken() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'XSRF-TOKEN') {
            return value;
        }
    }
    return null; // XSRF-TOKEN not found in cookies
}

// Add Headers needed to communicate with IBM Analytics
const customHeaders = new Headers();
customHeaders.append('X-Ca-Xssencoded', 'true');
customHeaders.append('X-Requested-With', 'XMLHttpRequest');

// Add XSRF token to custom headers
const xsrfToken = getXsrfToken();
customHeaders.append('X-Xsrf-Token', xsrfToken); // Replace with actual token


// Function to fetch reportVersions - step 2 of above
function fetch_reportversions(url_reportversions, customHeaders) {
    return new Promise((resolve, reject) => {
        // Now fetch report Versions
        fetch(url_reportversions, {
            method: 'GET',
            credentials: 'include', // This includes cookies
            headers: customHeaders // Include custom headers
        }).then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Process the response data
                logWithTimestamp('Response:', data);
                // Extract URL for Data Versions
                // Extract the URL for XML format
                let url = null;
                for (const item of data.data) {
                    if (item.format === 'XML') {
                        url = item._meta.links.content.url;
                        break;
                    }
                }
                
                // Print the extracted URL
                logWithTimestamp('CSV URL:', url);
                resolve(url)
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error.message);
                reject(error)
            });
       
    })
}

// Function to fetch Data - step 3 of above
function fetch_content(url_content, customHeaders) {
    return new Promise((resolve, reject) => {
        // Now fetch report Versions
        fetch(url_content, {
            method: 'GET',
            credentials: 'include', // This includes cookies
            headers: customHeaders // Include custom headers
        }).then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                resolve(response.text())
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error.message);
                reject(error)
            });
       
    })
}


// Make a GET request using the fetch API to 
// extract the URL for ReportVersions (Step 1) and
// then CSV URL and from there request CSV Content
fetch(report_versions, {
    method: 'GET',
    credentials: 'include', // This includes cookies
    headers: customHeaders // Include custom headers
})
    .then(response => {
        if (!response.ok) { throw new Error(`Request failed with status: ${response.status}`); }
        return response.json();
    })
    .then(data => {
        logWithTimestamp('Response:', data); // Process the response data
        const url_reportversions = data.data[0]._meta.links.outputs.url; // Extract URL from the JSON response
        logWithTimestamp('Extracted URL for Output versions:', url_reportversions); // Print the extracted URL

        // Get Report Versions and extract the CSV URL - step 2
        fetch_reportversions(url_reportversions, customHeaders).then(csvURL => {
            logWithTimestamp("URL to fetch CSV:",csvURL) // Actually needs some error handling ... but will not do this now
            // Get report as XML - step 3
            fetch_csv_content(csvURL, customHeaders).then(data => {
                logWithTimestamp("CSV data")
                console.dir(data)
                logWithTimestamp("Done")
            })
        })
    })
    .catch(error => { 
        console.error('Error:', error.message); // Very basic error handling
    });