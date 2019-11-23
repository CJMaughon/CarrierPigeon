# CarrierPigeon
App for The Growing Leaders

# Ver. 1.0.0 - Release Notes
- Assignment uploads now go to the proper Drive folder
- Uploading to an assignment does not mark it as complete for others anymore
- Updated ease-of-use features in the Instructor and Admin Dashboards
- Email notifications not currently working right now, should have them done soon

# Install Guide
## Pre-requisites
Software necessary for installing and running the application
- Node.js and NPM
- Git

You will also need a Google Account connected to Google Cloud Console
1. First, navigate to console.cloud.google.com
2. Using the pop-out sidebar, navigate to APIs & Services
3. Next click the ENABLE APIS AND SERVICES button near the top of the web page
4. Search for the Google Drive API, and click on it to go to its page. Click ENABLE on the page
5. Next, to create a service account, open the sidebar again, and hover over the APIs & Services, and go to the Credentials page
6. Next, click on Create credentials, and click on service account key
7. Under the Service account dropdown, click on New service account
8. Fill in the account name with whatever you want. For the Role, open the dropdown, click Project, and then click Owner.
9. Click the Create button, which will then download the JSON credentials.
10. Move that file to the CarrierPigeon project directory, and rename it credentials.json
11. Next, go to your Google Drive page for the account that manages the files, and right click on the folder containing all of those files. You will click share, and enter the service account's email. The service account is now a contributor, so it will now be able to upload to this folder, and access all of the files.

## Download and Install Instructions
Use the command
```
git clone <URL>
```
with the url from this repository in the directory you want to clone this repository to


Run the following command in a terminal in the base project directory
```
npm install
```

Then navigate to the client directory and run npm install with the following commands
```
cd client
npm install
```

## Run Instructions
To run in dev mode, use the command
```
npm run dev
```

To run the server itself, use the command
```
npm start
```