/**
 * This is a very basic sample implementation to retrieve data via XHR (Vanilla JS) from a IBM Analytics with Watson X server
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
 * Quick start:
 * Use chrome to logon to your IBM Analytics, then open the Web Developer Tools (F12)
 * Switch to Sources Tab, click on snippets, add a new snippet and paste the code below.
 * Change the endpoint and report ID.
 * 
 * Documentation of API being used: https://www.ibm.com/docs/en/cognos-analytics/12.0.0?topic=developer-rest-interface-reference 
 * 
 * See Sample Dashboards using Angular Framework for creating Hybrid Webapp
 * 1 : https://github.com/AMVARA-CONSULTING/dashboard_bap
 * 2 : https://github.com/AMVARA-CONSULTING/dashboard_tickets
 * 
 * Let me know any issues you face. Drop me an e-Mail: ralf.roeber - at - amvara dot de
 * 
 * AMVARA CONSULTING, Ralf Roeber, 13th August 2023
 *  
 */


// Define the IBM Analytics with Watson X endpoint URL
// ... this is the standard URL for you IBM Analytics Server. 
const endpoint = 'https://your-beloved-cognos-server/installed_path/bi/v1';

// Sample Boston Data Report - replace the ID with a Report ID from your Server that contains saved report output
const report_id = 'iA4FB2F11148345C0BD2A3907FC19FC9F'

// URL to fetch report_versions from
const report_versions = endpoint+'/objects/'+report_id+'/versions?fields=creationTime'

// Convenience Function to log console output with timestamp
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

// Make a GET request using the fetch API to 
// extract the URL for ReportVersions (Step 1) and
// then CSV URL and from there request CSV Content
function wrapper_to_get_data_from_cognos_server() {
    // measure time for execution
    let startTime = Date.now();
    // Step 1 - ask for the report versions URLs
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
            logWithTimestamp('Response - Step 1:', data); // Process the response data
            logWithTimestamp('Data Length', data.data.length)
            if (data.data.length == 0) {
                logWithTimestamp('The Server returned 0 URLs for the report with id:', report_id)
                return false // further execution does not make sense - no data, no chocolate ;-)
            }
            // Show report format of first version
            logWithTimestamp("Report creationTime:", data.data[0].creationTime)

            // Extract Url
            const url_reportversions = data.data[0]._meta.links.outputs.url; // Extract URL from the JSON response
            logWithTimestamp('Extracted URL for Output versions:', url_reportversions); // Print the extracted URL

            // Step 2 - Get Report Versions and extract the CSV URL
            fetch_reportversions(url_reportversions, customHeaders).then(csvURL => {
                logWithTimestamp("URL to fetch:",csvURL) // Actually needs some error handling ... but will not do this now
                // Step 3 - Get report as XML
                fetch_content(csvURL, customHeaders).then(data => {
                    logWithTimestamp("Response - Step 3", data)
                    let elapsedTime = Date.now() - startTime;
                    logWithTimestamp("Done in ", elapsedTime, "milliseconds")
                })
            })
        })
        .catch(error => {
            console.error('Error:', error.message); // Very basic error handling
        });
}

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
                logWithTimestamp('Response - Step 2:', data);
                // Extract URL for Data Versions
                // Extract the URL for XML or CSV format
                let url = null;
                for (const item of data.data) {
                    if (item.format === 'XML') {
                        url = item._meta.links.content.url;
                        break;
                    }
                    if (item.format === 'CSV') {
                        url = item._meta.links.content.url;
                        break;
                    }
                }
                
                // Print the extracted URL
                logWithTimestamp('URL:', url);
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
            headers: customHeaders, // Include custom headers
            mode: 'no-cors'
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




// Execute the wrapper_to_get_data_from_cognos_server
wrapper_to_get_data_from_cognos_server()