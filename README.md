# push-mongo
A Terrible Idea

# Don't Do It!
This repo is a Cloud Foundry pushable version of MongoDB. It's an awful idea that's basically never appropriate.

# Why Are You Still Here?
Didn't you read the bit above about how you shouldn't use this repo?

# OK, Well, Don't Complain That You Weren't Warned...
MongoDB is a TCP server, and therefore in order to use it, you will need to enable tcp tcp routing in your CF.  

You also need to update your quota to allow normal apps to use tcp routes:
```
cf update-quota default --reserved-route-ports 10
```

And you need to map a router group to a tcp domain.  (If you don't want to use tcp.example.com, then you will need to fiddle with `manifest.yml` to make the route match whatever you choose.)
```
cf create-shared-domain tcp.example.com --router-group default-tcp
```

# Other notes
- TODO: this example needs to be updated to use volume mounts, so that data is not discarded on app restart.
- mongo seemed to have trouble listening on all TCP ports, so this example uses `socat` to relay traffic to mongo on localhost.  Theoretically that should be unnecessary and we should be able to use the `--bind_ip_all` option.
