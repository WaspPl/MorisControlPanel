# Moris Control Panel
### About
This repository contains a frontend application designed to work with [**MorisAPI**](https://github.com/WaspPl/MorisAPI), an API for a DIY smart home assistant. It allows management of various  tables in an intuitive and fun way. </br> 
It requires the aforementioned API as well as NodeJS to work.
</br>
The design is fuly responsive and works on both computers and mobile devices. It features an auto login system so that the user doesnt have to log in every time they open the application.
### Screenshots
| Desktop Version | Mobile Version |
|--|--|
| <img src="https://github.com/WaspPl/MorisControlPanel/blob/main/readmeImages/WebsiteScreenshot.png?raw=true" width="100%"> | <img src="https://github.com/WaspPl/MorisControlPanel/blob/main/readmeImages/WebsiteMobileScreenshot.png?raw=true" width="100%"> |
### Quick Start
#### 1. Clone & Install
```bash
git clone https://github.com/WaspPl/MorisControlPanel.git
cd MorisControlPanel
npm install
```
#### 2. Create your .env file
At the source of the project create a file named ```.env```</br>
This file should contain the following text:
```
VITE_APP_API_USE_SAME_BASE_URL = true
VITE_APP_API_BASE_URL = 
VITE_APP_API_PORT = 8080
```
These parameters should represent the MorisAPI's URL and port. If ```VITE_APP_API_USE_SAME_BASE_URL``` is set to "true" ```VITE_APP_API_BASE_URL``` is not needed as the application uses the same URL you use to connect to it. </br>
Save the file and go to step 3
#### 3. Build and Run the Application
```bash
npm run dev
```
alternatively you can build the application with ```npm run build``` and host the created html file.

I hope you enjoy using this project for all your smart assistant needs ^^
