Container Launchpad--

A Docker-based container monitoring management dashboard built with Node.js and React.


Problem Statement-

Managing containers using CLI commands becomes in efficient at scale. GUI tools are convenient but are not always suitable for headless or remote server environments.


Container Launchpad provides a lightweight, deployable web interface to-

> Monitor container status
> Control container lifecycle
> Inspect logs
> Track real-time CPU and memory usage



Architecture-

Browser
        ->
Frontend (React + Nginx container)
        ->
Backend (Node.js container)
        ->
Docker Engine 
        ->
Managed Containers

THe backend communicates directly with the Docker Engine API by mounting the Docker socket to the container.



Feature-

> List running and stopped containers
> Start / Stop / Restart containers
> View container logs
> Real-time CPU and memory monitoring
> Dockerized full-stack deployment using docker-compose


Tech Stack-

* Node.js (Backend API)
* React (Frontend UI)
* Docker Engine API
* Docker Compose
* Nginx (Static build serving)

Integrated directly with the Docker Engine using socket binding provided by Docker.



How To Run-

Using Docker Compose

```bash
docker-compose up --build
```

Open:

```
http://localhost:3000
```

---



### Option 2: Development Mode

Backend:

```bash
cd server
npm install
node index.js
```

Frontend:

```bash
cd client
npm install
npm run dev
```

---

## Security Note

The backend mounts `/var/run/docker.sock` to communicate with Docker Engine.
This provides powerful control over the host Docker daemon and should be restricted in production environments.

---

## Future Improvements

* Authentication & Role-Based Access
* Container creation UI
* Image management
* Deployment to cloud VM
* CI/CD pipeline integration

