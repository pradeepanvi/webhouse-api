var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    detail: {
        type: String,
        required: true,
        minlength: 1
    },
    client: {
        type: String,
        required: true,
        minlength:1
    },
    link: {
        type: String,
        required: true,
        minlength: 1
    },
    front_end: {
        type: Boolean,
        value: false
    },
    psd_to_html: {
        type: Boolean,
        value: false
    },
    html5_css3_less: {
        type: Boolean,
        value: false
    },
    jquery: {
        type: Boolean,
        value: false
    },
    pixel_perfect: {
        type: Boolean,
        value: false
    },
    responsive: {
        type: Boolean,
        value: false
    },
    seo_friendly: {
        type: Boolean,
        value: false
    },
    testing: {
        type: Boolean,
        value: false
    },
    thumb_img: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    main_img: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    slider_img1: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    slider_img2: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
})

module.exports = {Project};