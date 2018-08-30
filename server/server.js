require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Project} = require('./models/project');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());

// Post Projects
app.post('/projects', (req, res) => {
    var project = new Project({
        name: req.body.name,
        detail: req.body.detail,
        client: req.body.client,
        link: req.body.link,
        front_end: req.body.front_end,
        psd_to_html: req.body.psd_to_html,
        html5_css3_less: req.body.html5_css3_less,
        jquery: req.body.jquery,
        pixel_perfect: req.body.jquery,
        responsive: req.body.responsive,
        seo_friendly: req.body.seo_friendly,
        testing: req.body.testing,
        thumb_img: req.body.thumb_img,
        main_img: req.body.main_img,
        slider_img1: req.body.slider_img1,
        slider_img2: req.body.slider_img2
    });

    project.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

// Get Projects
app.get('/projects', (req, res) => {
    Project.find().then((projects) => {
        res.send({projects});
    }, (e) => {
        res.status(400).send(e);
    })
})

// Get Full data by Project ID
app.get('/projects/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Project.findById(id).then((project) => {
        if(!project) {
            return res.status(404).send();
        }
        res.send({project});
    }).catch((e) => {
        res.status(400).send();
    })
})

// Update Projects/:id
app.patch('/projects/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completed = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null; 
    }

    Project.findByIdAndUpdate(id, {$set: body}, {new: true}).then((project) => {
        if(!project){
            return res.status(404).send();
        }

        res.send({project});
    }).catch((e) => {
        res.status(400).send();
    })
})

// DELETE Projects/:id
app.delete('/projects/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Project.findByIdAndRemove(id).then((project) => {
        if(!project){
            return res.status(404).send();
        }
        res.send(project);
    }).catch((e) => {
        res.status(404).send();
    })
})

//User
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send({users});
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
})

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    })
})

// DELETE /users logout {email, password}
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})