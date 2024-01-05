# HealU - POLYCLINIC MANAGEMENT SYSTEM

### Table of Contents

- [Introduction](#introduction)
- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Technologies](#technologies)
- [How to Run the Project](#how-to-run-the-project)
- [Screenshots](#screenshots)
- [Documentations](#documentations)
- [Contributors](#contributors)

### Introduction

HealU is a Polyclinic Management System that is developed to help the polyclinic to manage their daily operations.
This system is developed using microservices architecture. This system is developed as a part of the Healthcare
Information
System course (SBE40XX) at the Department of Systems & Biomedical Engineering, Cairo University.

### Overview

The system consists of:

- Home Page
- 6 clinics (Medical Staff Portals)
- API Gateway
- Patient Portal
- Admin Portal
- Tons of backend services

### Clinics

<div>
    <img src="https://svgshare.com/i/11cz.svg" width="60%"/>
</div>

### Features (Bear with me, it's a long list ;) )

- [x] Patient Portal
    - Patient Login
    - Patient Registration
        - Enter Personal Information
        - Enter Medical Information
        - Upload Medical Records
    - Manage Appointments
        - View Appointments
        - Cancel Appointments
        - Book Appointments
        - View Appointment Details
    - Patient Profile
    - Patient Medical Records
- [x] Admin Portal
    - Admin Login
    - Admin Dashboard & Analytics
        - View Statistics and Data for the whole system components
    - Clinic Management
        - (Add, Edit, Remove) Clinic
        - (Add, Edit, Remove) Clinic Services
        - (Add, Edit, Remove) Clinic Medical Staff
    - Patient Management
- [x] Medical Staff Portals (One for each Clinic)
    - Medical Staff Dashboard for Appointments & Patients
        - Manage Appointments
        - Manage Patients
        - (Add, Remove, Edit) Appointment Slots
    - Medical Staff Dashboard for Prescriptions & Medical Records
        - (View, Add) Patient Medical Records
        - (View, Add) Patient Prescriptions
        - (View,Request, Add) Lab Tests
    - Specialized Workflow features for each clinic
- [x] API Gateway
    - Authentication
    - Authorization
    - Load Balancing
    - Routing
    - Caching
    - Rate Limiting
    - Logging
    - Monitoring
- [x] Billing System
    - Offline Payment
    - Online Payment (PayPal)
    - Generate Bills & Invoices
    - View Bills & Invoices
    - Pay Bills
- [x] Document Management System
    - Upload Medical Documents
        - DICOM Images
        - JPEG/PNG Images
        - PDF Files
        - Word Documents
        - Excel Sheets
    - (View, Edit) Documents
    - Download Documents
- [x] Electronic Medical Records System
    - (View, Add) Patient Medical Records
    - (View, Add) Patient Prescriptions
    - (View,Request, Add) Lab Tests
    - (View, Add) Patient Medical Documents
- [x] Appointment Management System
    - (View, Add, Cancel) Appointments
    - (View, Add, Cancel) Appointment Slots
    - (View, Add, Cancel) Appointment Requests
    - (View, Add, Cancel) Appointment Cancellations

### System Architecture

The system is developed using microservices architecture. The system consists of 6 clinics, each clinic has its own
portal for the medical staff to manage the clinic's operations. There might be a backend service for the clinic or not,
depending on the clinic's operations. The interactions between the clinics and the other system components are done
via REST APIs. the connection between the clinics & services and the other system components is done via the API
Gateway.
The API Gateway is responsible for authentication, authorization, load balancing, routing, caching, rate limiting,
logging, and monitoring.

![System Architecture](https://i.postimg.cc/SQvhC4Gg/Untitled.png)

#### Database schemas

#### Services

- Appointments Service

  ![Appointments Service](https://i.postimg.cc/CM3f73h4/Picture1.png)
- Electronic Medical Records Service

  ![Electronic Medical Records Service](https://i.postimg.cc/MK1fF9XJ/Picture5.jpg)
- Registration Service

  ![Registration Service](https://i.postimg.cc/NMLgvj4r/Picture4.png)
- Billing Service

  ![Billing Service](https://i.postimg.cc/sX83jC6H/Picture3.png)
- Document Management Service

  ![Document Management Service](https://i.postimg.cc/0r1xSdqp/Picture6.png)
- Admin Service

  ![Admin Service](https://i.postimg.cc/cCn06kPx/Picture7.png)

### Technologies

#### Frontend

The Whole frontend is a single project where all the team members worked on. Following MVC architecture.
<div>
<img style="margin-right: 1rem" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="cpp" width="50" height="50" />
<img style="margin-right: 1rem" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="cpp" width="50" height="50" />
<img style="margin-right: 1rem" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="cpp" width="50" height="50" />
<img style="margin-right: 1rem" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" alt="cpp" width="50" height="50" />
</div>

#### Backend

The backend is developed using microservices architecture. Each service is a separate project.
<div>
<img style="margin-right: 1rem" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="cpp" width="50" height="50" />
<img style="margin-right: 1rem" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="cpp" width="50" height="50" />
<img style="margin-right: 1rem" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="cpp" width="50" height="50" />
<img style="margin-right: 1rem" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" alt="cpp" width="50" height="50" />
<img style="margin-right: 1rem" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg" alt="cpp" width="50" height="50" />
</div>

#### Databases

Multiple databases are used in the system. Each service has its own database, according to its needs.
<div>
<img style="margin-right: 1rem" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" alt="cpp" width="50" height="50" />
<img style="margin-right: 1rem" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" alt="cpp" width="50" height="50" />
<img style="margin-right: 1rem" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" alt="cpp" width="50" height="50" />
</div>

### How to Run the Project

Most Services and Databases are hosted on render.com. Most of them may be down due to the limited free tier.

#### Live Service URLs

<div>
<img style="margin-right: 1rem" src="https://cdn.buttercms.com/p0IHcvwRSlOAEjBcTf0C" alt="cpp" width="200" />
</div>

- [API Gateway](https://healu-api-gateway.onrender.com)
- [EMR Service](https://emr-sevice.onrender.com/)
- [Appointments Service](https://appointment-service-y30u.onrender.com)
- [Billing Service](https://billing-2.onrender.com/)
- [Document Management Service](https://doc-storage-healu.onrender.com)
- [Registration Service](https://registration-zf9n.onrender.com)
- [Admin Service](https://documenter.getpostman.com/view/21802740/2s9Ykn9My8 		)
- [Analytics](https://analytics-jf06.onrender.com)


You can run the project locally by following these steps:

1. Clone the project
2. Install the dependencies for each service
    - for nodejs services:
        ```bash
        cd ./service-name
        npm install
        ```
    - for python services:
         ```bash
         cd ./service-name
         pip install -r requirements.txt
         ```
3. Run the services
    - for nodejs services:
        ```bash
        cd ./service-name
        npm run dev OR npm start
        ```
    - for python services:
        ```bash
        cd ./service-name
        python manage.py runserver
        ```
4. Run the frontend

- do the following:
   ```bash
   cd ./client
   npm install
   npm start
   ```

5.Enjoy!

### Screenshots

#### Home Page

![Home Page](https://i.postimg.cc/N0hczvCQ/home.png
)

#### Appointments

![Patient Portal](https://i.postimg.cc/90x284Kk/app.png)

#### Clinic Portal

![Clinic Portal](https://i.postimg.cc/PrRh1wmp/cportal.png)
![Clinic Portal](https://i.postimg.cc/52QJg23P/cdash.png)

#### Analytics

![Analytics](https://i.postimg.cc/yYdsJPSC/Picture1.jpg)

### Documentations
All the Services APIs is documented on Postman

<div>
<img style="margin-right: 1rem" src="https://quickstarts.postman.com/images/postman-logo-orange.svg" alt="cpp" width="200" />
</div>

- [API Gateway](https://documenter.getpostman.com/view/31592131/2s9YkuZyR6)
- [EMR Service](https://cloudy-capsule-688276.postman.co/workspace/New-Team-Workspace~9e6639a6-586e-4b2d-a6b0-6d2f46a77c5e/collection/28817661-402bc871-7f97-4871-9178-37e2209bf164?action=share		)
- [Appointments Service](https://www.postman.com/crimson-robot-856184/workspace/his-workspace/collection/27410236-65736d15-9c4a-45aa-88e7-493d791098a4?action=share&creator=28759495)
- [Billing Service](https://documenter.getpostman.com/view/31712216/2s9YsDjZnv)
- [Document Management Service](https://documenter.getpostman.com/view/21802740/2s9Ykhg3y4)
- [Registration Service](https://winter-firefly-199674.postman.co/workspace/My-Workspace~e7b98c73-8752-4c75-8f53-fdc00140b729/collection/31686183-f30050f5-a754-47eb-93fa-ada9dd20c888?action=share		)
- [Admin Service](https://documenter.getpostman.com/view/21802740/2s9Ykn9My8)

### Contributors

Around 40 Senior Students from the Department of Systems & Biomedical Engineering, Cairo University contributed to this
project.
They were divided into 7 teams, each team was responsible for a clinic and a service. and 1 core team that was
responsible for the Patient Portal and API Gateway.
Each team had a team lead, these leads with the core team formed the project management team. which was responsible for
Admin Service, Analytics, and Billing System & more

<table>
    <tbody>
    <tr>
        <td colspan="6" style="text-align: center;"><b>Core Team</b></td>
    </tr>
    <tr>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/Zeyad-Amr">
                <img alt="Zeyad Amr Fekry" src="https://avatars.githubusercontent.com/Zeyad-Amr" width="100px;">
                <br/>
                <sub><b>Zeyad Amr Fekry</b></sub>
            </a>
            <br/>
            <span>(Team Lead)</span> <br/>
            <span>Full Stack</span>
        </td>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/AhmedRaouf481">
                <img alt="Ahmed Abd ElRaouf" src="https://avatars.githubusercontent.com/AhmedRaouf481" width="100px;">
                <br/>
                <sub><b>Ahmed Abd ElRaouf</b></sub>
            </a>
            <br/>
            <span>Full Stack</span>
        </td>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/Abdelrhman012">
                <img alt="Abdelrahman Yasser" src="https://avatars.githubusercontent.com/Abdelrhman012" width="100px;">
                <br/>
                <sub><b>Abdelrahman Yasser</b></sub>
            </a>
            <br/>
            <span>Frontend</span>
        </td>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/momen882001">
                <img alt="Mo'men Mohamed" src="https://avatars.githubusercontent.com/momen882001" width="100px;">
                <br/>
                <sub><b>Mo'men Mohamed</b></sub>
            </a>
            <br/>
            <span>Frontend</span>
        </td>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/Mazen-Aboulkhair">
                <img alt="Mazen Tarek" src="https://avatars.githubusercontent.com/Mazen-Aboulkhair" width="100px;">
                <br/>
                <sub><b>Mazen Tarek</b></sub>
            </a>
            <br/>
            <span>PM & Backend</span>
        </td>
    </tr>
    <tr>
        <td colspan="6" style="text-align: center;" >
            <b>MDIMA ( Nutrition Clinic )</b>
        </td>
    </tr>
    <tr>
        <td align="center" valign="top" width="14.28%">
            <a href="https://github.com/1brahimmohamed">
                <img alt="Ibrahim Mohamed" src="https://avatars.githubusercontent.com/1brahimmohamed" width="100px;"/>
                <br/>
                <sub><b>Ibrahim Mohamed</b></sub>
            </a>
            <br/>
            <span>(Team Lead)</span> <br/>
            <span>Full Stack</span>
        </td>
        <td align="center" valign="top" width="14.28%">
            <a href="https://github.com/mahamedhat">
                <img alt="Maha Medhat" src="https://avatars.githubusercontent.com/mahamedhat" width="100px;"/>
                <br/>
                <sub><b>Maha Medhat</b></sub>
            </a>
            <br/>
            <span>Backend</span>
        </td>
        <td align="center" valign="top" width="14.28%">
            <a href="https://github.com/doha-eid">
                <img alt="Doha Eid" src="https://avatars.githubusercontent.com/doha-eid" width="100px;"/>
                <br/>
                <sub><b>Doha Eid</b></sub>
            </a>
            <br/>
            <span>Backend</span>
        </td>
        <td align="center" valign="top" width="14.28%">
            <a href="https://github.com/mayekhaled0">
                <img alt="Maye Khaled" src="https://avatars.githubusercontent.com/mayekhaled0" width="100px;"/>
                <br/>
                <sub><b>Maye Khaled</b></sub>
            </a>
            <br/>
            <span>Frontend</span>
        </td>
        <td align="center" valign="top" width="14.28%">
            <a href="https://github.com/AmeeraMOhammed">
                <img alt="Maye Khaled" src="https://avatars.githubusercontent.com/AmeeraMOhammed" width="100px;"/>
                <br/>
                <sub><b>Amira Mohamed</b></sub>
            </a>
            <br/>
            <span>Frontend</span>
        </td>
    </tr>
    <tr>
        <td colspan="6" style="text-align: center;" >
            <b>MADS ( Dental Clinic )</b>
        </td>
    </tr>
    <tr>
        <td align="center" valign="top" width="16.66%">
            <a href="https://github.com/MohamedAIsmail">
                <img alt="Mohamed Ismail" src="https://avatars.githubusercontent.com/MohamedAIsmail" width="100px;">
                <br/>
                <sub><b>Mohamed Ismail</b></sub>
            </a>
            <br/>
            <span>(Team Lead)</span> <br/>
            <span>Full-Stack</span>
        </td>
        <td align="center" valign="top" width="16.66%">
            <a href="https://github.com/Dina153">
                <img alt="Dina Mostafa" src="https://avatars.githubusercontent.com/Dina153" width="100px;">
                <br/>
                <sub><b>Dina Mostafa</b></sub>
            </a>
            <br/>
            <span>Backend</span>
        </td>
        <td align="center" valign="top" width="16.66%">
            <a href="https://github.com/Sherif-2001">
                <img alt="Sherif Ahmed" src="https://avatars.githubusercontent.com/Sherif-2001" width="100px;">
                <br/>
                <sub><b>Sherif Ahmed</b></sub>
            </a>
            <br/>
            <span>Backend</span>
        </td>
        <td align="center" valign="top" width="16.66%">
            <a href="https://github.com/ahmed-elsarta">
                <img alt="Ahmed El Sarta" src="https://avatars.githubusercontent.com/ahmed-elsarta" width="100px;">
                <br/>
                <sub><b>Ahmed El Sarta</b></sub>
            </a>
            <br/>
            <span>Frontend</span>
        </td>
        <td align="center" valign="top" width="16.66%">
            <a href="https://github.com/Adham-Mohammed">
                <img alt="Adham Mohammed" src="https://avatars.githubusercontent.com/Adham-Mohammed" width="100px;">
                <br/>
                <sub><b>Adham Mohammed</b></sub>
            </a>
            <br/>
            <span>Frontend</span>
        </td>
        <td align="center" valign="top" width="16.66%">
            <a href="https://github.com/MInaAzer01">
                <img alt="Mina Azeer" src="https://avatars.githubusercontent.com/MInaAzer01" width="100px;">
                <br/>
                <sub><b>Mina Azeer</b></sub>
            </a>
            <br/>
            <span>Backend</span>
        </td>
    </tr>
    </tbody>
    <tr>
        <td colspan="6" style="text-align: center;" >
            <b>iHIS ( Ophthalmology Clinic )</b>
        </td>
    </tr>
    <tr>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/Hanya-Ahmad">
                <img alt="Hanya Ahmed" src="https://avatars.githubusercontent.com/Hanya-Ahmad" width="100px;">
                <br/>
                <sub><b>Hanya Ahmed</b></sub>
            </a>
            <br/>
            <span>(Team Lead)</span> <br/>
            <span>Full-Stack</span>
        </td>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/MariamMounier">
                <img alt="Mariam Mounier" src="https://avatars.githubusercontent.com/MariamMounier" width="100px;">
                <br/>
                <sub><b>Mariam Mounier</b></sub>
            </a>
            <br/>
            <span>Frontend</span>
        </td>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/ayaamrr">
                <img alt="Aya Amr" src="https://avatars.githubusercontent.com/ayaamrr" width="100px;">
                <br/>
                <sub><b>Aya Amr</b></sub>
            </a>
            <br/>
            <span>Backend</span>
        </td>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/Salmoon8">
                <img alt="Mohamed Salman" src="https://avatars.githubusercontent.com/Salmoon8" width="100px;">
                <br/>
                <sub><b>Mohamed Salman</b></sub>
            </a>
            <br/>
            <span>Backend</span>
        </td>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/Nourhan-Sayed">
                <img alt="Nourhan Sayed" src="https://avatars.githubusercontent.com/Nourhan-Sayed" width="100px;">
                <br/>
                <sub><b>Nourhan Sayed</b></sub>
            </a>
            <br/>
            <span>Frontend</span>
        </td>
    </tr>
    <tr>
        <td colspan="6" style="text-align: center;" >
            <b>medmates ( Orthopedic Clinic )</b>
        </td>
    </tr>
    <tr>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/MaryamMegahed">
                <img alt="Maryam Megahed" src="https://avatars.githubusercontent.com/MaryamMegahed" width="100px;">
                <br/>
                <sub><b>Maryam Megahed</b></sub>
            </a>
            <br/>
            <span>(Team Lead)</span> <br/>
            <span>Backend</span>
        </td>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/SarAmgad">
                <img alt="Sara Amgad" src="https://avatars.githubusercontent.com/SarAmgad" width="100px;">
                <br/>
                <sub><b>Sara Amgad</b></sub>
            </a>
            <br/>
            <span>Backend</span>
        </td>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/Rawda-Yousry">
                <img alt="Rawda Yousry" src="https://avatars.githubusercontent.com/Rawda-Yousry" width="100px;">
                <br/>
                <sub><b>Rawda Yousry</b></sub>
            </a>
            <br/>
            <span>Frontend</span>
        </td>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/rawan.ayed01">
                <img alt="Rawan Abd-Elrahman" src="https://avatars.githubusercontent.com/rawan.ayed01" width="100px;">
                <br/>
                <sub><b>Rawan Abd-Elrahman</b></sub>
            </a>
            <br/>
            <span>Frontend</span>
        </td>
        <td align="center" valign="top" width="20%">
            <a href="https://github.com/SamaMostafa1">
                <img alt="Sama Mostafa" src="https://avatars.githubusercontent.com/SamaMostafa1" width="100px;">
                <br/>
                <sub><b>Sama Mostafa</b></sub>
            </a>
            <br/>
            <span>Full Stack</span>
        </td>
    </tr>
    <tr>
        <td colspan="6" style="text-align: center;" >
            <b>care lifters ( Pediatric Clinic )</b>
        </td>
    </tr>
    <tr>
        <td align="center" valign="top" width="16.66%">
            <a href="https://github.com/Abram1111">
                <img alt="Abram Gad Hanna" src="https://avatars.githubusercontent.com/Abram1111" width="100px;">
                <br/>
                <sub><b>Abram Gad Hanna</b></sub>
            </a>
            <br/>
            <span>(Team Lead)</span> <br/>
            <span>Frontend</span>
        </td>
        <td align="center" valign="top" width="16.66%">
            <a href="https://github.com/Karemanyasser">
                <img alt="Kareman Yasser Mohamed" src="https://avatars.githubusercontent.com/Karemanyasser"
                     width="100px;">
                <br/>
                <sub><b>Kareman Yasser Mohamed</b></sub>
            </a>
            <br/>
            <span>Backend</span>
        </td>
        <td align="center" valign="top" width="16.66%">
            <a href="https://github.com/MayarFayez">
                <img alt="Mayar Fayez Sadek" src="https://avatars.githubusercontent.com/MayarFayez" width="100px;">
                <br/>
                <sub><b>Mayar Fayez Sadek</b></sub>
            </a>
            <br/>
            <span>Frontend</span>
        </td>
        <td align="center" valign="top" width="16.66%">
            <a href="https://github.com/Nada-21">
                <img alt="Nada Ahmed Mohamed" src="https://avatars.githubusercontent.com/Nada-21" width="100px;">
                <br/>
                <sub><b>Nada Ahmed Mohamed</b></sub>
            </a>
            <br/>
            <span>Backend</span>
        </td>
        <td align="center" valign="top" width="16.66%">
            <a href="https://github.com/Naira06">
                <img alt="Naira Youssef Abdelazim" src="https://avatars.githubusercontent.com/Naira06" width="100px;">
                <br/>
                <sub><b>Naira Youssef Abdelazim</b></sub>
            </a>
            <br/>
            <span>Frontend</span>
        </td>
        <td align="center" valign="top" width="16.66%">
            <a href="https://github.com/Yaso01n">
                <img alt="Yasmin Yasser Ali" src="https://avatars.githubusercontent.com/Yaso01n" width="100px;">
                <br/>
                <sub><b>Yasmin Yasser Ali</b></sub>
            </a>
            <br/>
            <span>Database</span>
        </td>
    </tr>
</table>


### Submitted to:
Dr. Ahmed Morsy, Dr Eman Ayman & Eng Yara Wael

All rights reserved © 2024 to Systems & Biomedical Engineering, Cairo University (Class 2024)
