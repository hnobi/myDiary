# My Diary
[![Build Status](https://travis-ci.org/hnobi/myDiary.svg?branch=develop)](https://travis-ci.org/hnobi/myDiary)
[![Coverage Status](https://coveralls.io/repos/github/hnobi/myDiary/badge.svg?branch=develop)](https://coveralls.io/github/hnobi/myDiary?branch=develop)
[![Code Climate](https://codeclimate.com/github/hnobi/myDiary/badges/gpa.svg)](https://codeclimate.com/github/hnobi/myDiary)[![Test Coverage](https://api.codeclimate.com/v1/badges/6ced9621206662d7187c/test_coverage)](https://codeclimate.com/github/hnobi/myDiary/test_coverage)



## Description
MyDiary App is an online diary app which allows users to pen down there feeling.

# Table of Contents

 * [Technologies](#technologies)
 * [Features](#features)
 * [Installation](#installation)

## Technologies
* HyperText Mark-up Language (HTML)
* Cascade Style Sheet (CSS)
* Vanilla Javascript
* PostgreSQL Database(raw SQl)
* Nodejs (Express framework)

### Pivotal Tracker
MyDiary app project is broken down into small task with pivotal tracker board. The link to the relevant Pivoltal tracker board is (https://www.pivotaltracker.com/n/projects/2183562)

### API Enpoint
API Endpoints is hosted at (https://your-diary.herokuapp.com/api/v1)

### UI Templates
The application is hosted online on gh-pages with 
 [MyDiary] (https://hnobi.github.io/myDiary/UI/)


## Features
- User Signup and Signin
- Create/Add entry
- modify or delete entry
- View all entries
- view details of an entry

## Getting Started
### Installation
- install POSTMAN app
- run `npm run start:dev` then navigate to `localhost:3000` on POSTMAN


### API Endpoint Route 
<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>TASK</th></tr>

<tr><td>POST</td> <td>api/v1/auth/signup</td> <td> Register user</td></tr>

<tr><td>POST</td> <td>api/v1/auth/signin</td> <td> Login user</td></tr>

<tr><td>GET</td> <td>api/v1/entries</td> <td> Fetch all entries for a user</td></tr>

<tr><td>GET</td> <td>api/v1/entries/entryId</td> <td> Fetch the details of an entry</td></tr>

<tr><td>POST</td> <td>api/v1/entries</td> <td> Add entry </td></tr>

<tr><td>PUT</td> <td>api/v1/entries/entryId</td> <td> Modify an entry</td></tr>

<tr><td>DELETE</td> <td>api/v1/entries/entryId</td> <td> Delete an entry</td></tr>






</table>

## Author
**Hammed Noibi** 
