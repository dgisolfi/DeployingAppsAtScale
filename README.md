# DeployingAppsAtScale

An introduction to Docker and Kubernetes


## Run as a process

```
sudo apt install nodejs npm -y && sudo npm install -g yarn
```

```
npm install && node run build && node index.js
```

<!-- mention forever here -->

## Run as a systemD service

<!-- show that they are stored  -->

```
ls /lib/systemd/system
```

create a new systemd service file

```
sudo cp app.service /lib/systemd/system
```

relaod the damon to pick up the new info
```
sudo systemctl daemon-reload
```

run the app
```
sudo systemctl start app
```

check the status

```
sudo systemctl status app
```

turn it off
```
sudo systemctl stop app
```
## Run using docker

```
docker build -t app .
```

```
docker run -p 3000:3000 app
```

```
docker run --name app -d -p 3000:3000 app
```

```
docker kill app && docker rm app
```

## Run using kubernetes

### Publish Docker Image to Docker Hub

build the image(if not present)

```
docker build -t app /path/to/dockerfile
```

Tag the image
```
docker tag app ${docker_hub_account}/app:latest
```

Push the image
```
docker push ${docker_hub_account}/app
```

### Deploy the App on kubernetes

bring it up
```
kubectl create -f app.yaml
```

take it down
```
kubectl create -f app.yaml
```

## Deploy to kubernetes via helm