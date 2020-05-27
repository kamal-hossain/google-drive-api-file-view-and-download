# Host your files in google drive and grab them via Google Drive API v3

#### About:

This web app using NODEJS for backend & REACT for frontend. Main goal is to store files in google drive folder & show them for download or open directly in a browser.

### How to use:
#### How to get the google drive Credentials:
1. Go to [Google Drive API v3 for Nodejs](https://developers.google.com/drive/api/v3/quickstart/nodejs)
2. Enable drive api as (use desktop app option)
3. now run the code snippet with node in your environment to get the refresh token.
4. set the environment variables for 'CREDENTIALS' & 'TOKEN'
#### How to store files for the site:
1. Create a folder in drive and share it as a public. 
2. Folder structure will be as follows:

    |_main-folder-in-drive-root

        |_Folder-1
    
        |    |_Folder-1
    
        |        |_Folder-1
    
        |            |_files-to-view-or-download1
    
        |            |_files-to-view-or-download2
    
        |_Folder-2
    
            |_Folder-1
        
                |_Folder-1
            
                    |_files-to-view-or-download1

#### How to start app:
* Start backend by 
```bash
    nodemon server.js
```
* Start frontend by 
```bash
    cd FRONTEND
    npm start
```