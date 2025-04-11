const express = require('express');
const session=require('express-session');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();//enviorment variable loaded from .env file into the folder