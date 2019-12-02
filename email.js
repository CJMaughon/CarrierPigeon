const sendmail = require('sendmail')();

sendmail({
    from: 'no-reply@growingleaders.com',
    to: 'petrillojuliana@gmail.com',
    subject: 'Your Assignment is Due!',
    html: 'You have an assignment (Holiday Update) due on December 1, 2019.',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});