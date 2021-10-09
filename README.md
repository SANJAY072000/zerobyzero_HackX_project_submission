# Token Tracker App

This app provides an online platform to connect doctors and patients. Through this 
app, patients could place an appointment with the doctor and can check doctor 
status. For each appointment, patient would receive a token which he could track 
through a link. This link is sent to patient's email. As a result, this would save 
patients time waiting outside the clinics for their appointment turn. 

Hospitals could add doctors to their dashboard. It is required otherwise patients 
won't be able to place appointments. Hospitals could add doctors only if they have 
required credits and to earn credits they need to pay to this web app online. 

It's built using MERN stack and include stripe API integration as well. App is 
containerized using docker and docker compose.


## Installing and Contributing Guide

**Manually**

1. Fork the repository to your account.
2. Clone your fork.
3. Open CMD and navigate to the cloned folder.
4. Run npm install.
5. Now run npm start.
6. Open another instance of CMD and navigate to the client folder.
7. Run npm start.

**Docker Way**
1. Fork the repository to your account.
2. Clone your fork.
3. Open CMD and navigate to the cloned folder.
4. Make sure you have docker and GNU installed.
5. Type make run-dev in CMD and press enter.
6. Docker compose will make sure all services start automatically.


Note: Locally project will not work because some credentials have been removed from the code.


Feel free to contribute to this project with some new ideas. If you like the concept, please star this repository.

