

'use strict';

const createHttpTaskWithToken = require('./createTask');
const express = require('express');

var bodyParser = require('body-parser');

const app = express();

const {QUEUE_NAME} = process.env;
const {QUEUE_LOCATION} = process.env;
const {FUNCTION_URL} = process.env;
const {SERVICE_ACCOUNT_EMAIL} = process.env;


app.use(bodyParser());

// [START cloud_tasks_app]
app.post('/create-task', (req, res) => {
  // Set the task payload to the form submission.
  // const {to_name, from_name, to_email, date} = req.body;
  // const payload = {to_name, from_name, to_email};




  var google_cloud_project="task-queue-336f7";
  var queue_name="test-execute";
  var queue_location="southamerica-east1";
  var service_account_email="new-task@task-queue-336f7.iam.gserviceaccount.com";


console.log("start");


  var task=createHttpTaskWithToken(
    google_cloud_project,
    queue_name,
    queue_location,
    req.body.url,
    service_account_email,
    req.body.payload,
    req.body.date
  );
  console.log(req.body);
  res.status(202).send(task);
});
// [END cloud_tasks_app]

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
