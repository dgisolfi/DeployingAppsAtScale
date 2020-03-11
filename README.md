# DeployingAppsAtScale

An introduction to Docker and Kubernetes

### Author

**Daniel Gisolfi** - *All current work* - [dgisolfi](https://github.com/dgisolfi)

## About

This repo contains all the necessary demos and code for the *Deploying Apps At Scale* presentation originally given to the Marist Computer Society. The following are all commands for each demo for the presentation. [The corresponding slides can be found here](https://github.com/dgisolfi/DeployingAppsAtScale/blob/master/keynote/DeployingAppsAtScale.pdf)

## Run as a process

From the root of the repo enter the `app` dir.

Install the JS runtime(node) and nodes package manager, this is a react app so we also need yarn for building.

```
sudo apt install nodejs npm -y && sudo npm install -g yarn
```

Install all the packages defined in package.json, then run the build script. Finally, run the express server defined in index.js

```
npm install && node run build && node index.js
```

Done, use `CTRL`+`C` to exist the process



## Run as a background process

Run the same express server but now redirect all output to a log file and use the logical operator`&` to run the process in the background.

```
node index.js > app.log 2>&1 &
```

Before moving on let's turn off that process.

```
kill $(pgrep -f 'node index.js')
```



## Run as a systemD service

Where are systemD service definitions stored?

```
ls /lib/systemd/system
```

Let's create a new systemd service file.

```
sudo cp app.service /lib/systemd/system
```

Now we reload the daemon to pick load the new service file.
```
sudo systemctl daemon-reload
```

Did it work?
```
sudo systemctl status app
```

Good now that it's loaded, run the app.

```
sudo systemctl start app
```

Is the app running now? let's check.

```
sudo systemctl status app
```

Ok, we're done here, turn it off.
```
sudo systemctl stop app
```


## Run using docker

Let's build the image based on the `Dockerfile` and tag it as `app`

```
docker build -t app .
```

Now that we have a "template"(image) let's use it to create a container

```
docker run --name app -d -p 3000:3000 app
```

We don't need it anymore, kill it!

```
docker kill app && docker rm app
```



## Run using Kubernetes


### Deploy the App on Kubernetes

Bring it up
```
kubectl create -f app.yaml
```

Take it down
```
kubectl delete -f app.yaml
```



### Deploy to Kubernetes via Helm

Create a new chart. Let's name it something obvious like...chart!
```
helm create chart
```

View the values
```
vim ./chart/values.yaml
```

Is the chart valid? let's use the linter to see.
```
helm lint chart
```

Install the chart.
```
helm install app ./chart
```


If we want to package it up we can!
```
helm package chart
```

Users can either pull the package from a helm chart repo or just download the tarball and install it like so.


```
helm install app app-0.1.0.tgz
``
```