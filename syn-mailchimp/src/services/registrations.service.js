const httpStatus = require('http-status');
const { Registrations } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('./../config/config');
const axios = require('axios');
const https = require('https');
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const createItem = async (userBody,id,tags) => {

//   let u = Registrations.findOneAndUpdate({email: userBody.email },{ $addToSet: {events:id,tags:tags} }, { upsert: true, new: true,useFindAndModify:true }).then(user =>{
//     user.first_name = userBody.first_name;
//     return user;
//   });
//   // console.log("u +".u);
// return u;

await Registrations.findOneAndUpdate({'email':userBody.email.toLowerCase()},{ upsert: true, new: true,useFindAndModify:false },function(err,item){

if(item && item.email === userBody.email){

  Registrations.updateOne({email:userBody.email.toLowerCase()},
  {$addToSet: {events:id,tags:tags}}, function (err, docs) {
  if (err){
      console.log(err)
  }
  else{
      // console.log("Updated Docs : ", docs);
  }
});

} else {
  console.log(userBody);
  newItem = Registrations.create(userBody);
  return newItem;
}


  })

// // });
// return true;
//   // return Registrations.createO(userBody);
// });
return true;
}
/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryItems = async (filter, options) => {
  const users = await Registrations.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getItemById = async (id) => {
  return Registrations.find({events:{$in:id}}).populate('tags').populate('events')
};

const getItemByEventId = async (id) => {
  return Registrations.find({events:{$in:id}}).populate('tags');
};

const searchQuery = async (body) => {

//  return  Registrations.aggregate([ {"$match": {"email" :{ "$ne" : null } } },
//  {"$group" : {"_id": "$email", "count": { "$sum": 1 } } },
//   {"$match": {"count" : {"$gt": 1} } },
//  {"$project": {"email" : "$_id", "_id" : 0} }])


if(!body.first_name && !body.last_name && !body.email && !body.position && !body.organization && !body.country && body.events.length <= 0 && body.tags.length <= 0){
  return false;
}

  let query =  Registrations.find();

  // query.where('email',{$in:['khaldoon.hf@gmail.com','wmahmeed@gmail.com']});

// return  query.exec();
  // let query = PersonModel().find();

if (body.first_name) {
    query.where('first_name', { $regex: '.*' + body.first_name + '.*',$options: 'i' });
}
if (body.last_name) {
  query.where('last_name', { $regex: '.*' + body.last_name + '.*',$options: 'i' });
}
if (body.email) {
  query.where('email', { $regex: '.*' + body.email + '.*',$options: 'i' });
}
if (body.position) {
  query.where('position', { $regex: '.*' + body.position + '.*',$options: 'i' });
}
if (body.organization) {
  query.where('organization', { $regex: '.*' + body.organization + '.*',$options: 'i' });
}
if (body.country) {
  query.where('country', { $regex: '.*' + body.country + '.*',$options: 'i' });
}
if(body.events.length > 0){
  query.where('events', {$in:body.events});
}
if(body.tags.length > 0){
  query.where('tags', {$in:body.tags});
}

query.populate('events').populate('tags');

return await query.exec();


}


const GetRegistratedMobileNumbers = async (body) => {

  //  return  Registrations.aggregate([ {"$match": {"email" :{ "$ne" : null } } },
  //  {"$group" : {"_id": "$email", "count": { "$sum": 1 } } },
  //   {"$match": {"count" : {"$gt": 1} } },
  //  {"$project": {"email" : "$_id", "_id" : 0} }])


  if(!body.position && !body.organization && !body.country && body.events.length <= 0 && body.tags.length <= 0){
    return false;
  }

    let query =  Registrations.find();

    // query.where('email',{$in:['khaldoon.hf@gmail.com','wmahmeed@gmail.com']});

  // return  query.exec();
    // let query = PersonModel().find();
  query.where('mobile_number',{$gt:0})
  if (body.position) {
    query.where('position', { $regex: '.*' + body.position + '.*',$options: 'i' });
  }
  if (body.organization) {
    query.where('organization', { $regex: '.*' + body.organization + '.*',$options: 'i' });
  }
  if (body.country) {
    query.where('country', { $regex: '.*' + body.country + '.*',$options: 'i' });
  }
  if(body.events.length > 0){
    query.where('events', {$in:body.events});
  }
  if(body.tags.length > 0){
    query.where('tags', {$in:body.tags});
  }

  return await query.exec();


  }

  const sendWhatsappMessage = async (body) => {


// numbers = ["971565546190","971562248181"];
numbers = ["971565546190"];

numbers.map((n,i) => {
  console.log(n);
  SendWhatsapp(n);



});



return;
    const response = await axios.post(
      'https://graph.facebook.com/v16.0/15550832559/messages',
      // '{ "messaging_product": "whatsapp", "to": "15555555555", "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } }',
      {
        'messaging_product': 'whatsapp',
        'to': '971565546190',
        "preview_url": false,
        "recipient_type": "individual",
        "type": "text",
        "text": {
          "body": "test message"
      }
      },
      {
        headers: {
          'Authorization': 'Bearer EAADphqqXVE4BAH6FhXNhKuj4gWnEm8Egvk5UZCl3DgZAOpgiqsOWD1s6cZAzJpgekowgL9BEqKVZBmTwIVZAFFnZC7dFoP0UZCMsOHueGmVZALqJLmSSiUOZCvqARrzzoenUAO2gXI1LaMZBIDz1ICFkhZB9hLHbyqCEBNULkBJyenf7pmKysLFVOAiZBFZC37YN8vRTgsYwuTfCV5rCiGQUk8vT8',
          'Content-Type': 'application/json'
        }
      }
    );



  }

  const getTextMessageInput = (recipient, text)  => {
    return JSON.stringify(  {
      'messaging_product': 'whatsapp',
      'to': recipient,
      'type': 'template',
      'template': {
        'name': 'hello_world',
        'language': {
          'code': 'en_US'
        }
      }
    });
  }


  const SendSMS = async (body) => {
    // console.log(body);
    return true;
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    axios.post('https://app.rivet.solutions/api/v2/SendSMS', {
      SenderId: 'AD-MME',
      ApiKey: config.rivetApiKey,
      ClientId: config.rivetSecretKey,
      MobileNumbers:body.numbers,
      Message:body.message
    },
   {
    headers: {
      'Content-Type': 'application/json',
    },

   })
    .then(function (response) {
      return response;
       //  setTagsArray([]);
    })
    .catch(function (error) {
    return error;
    });
  }


  const SendWhatsapp = (number) => {

    // let data = JSON.stringify({ "messaging_product": "whatsapp", "to": number, "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } });

//Needs to send first Message then this request will work.
//     let data = JSON.stringify({
//   "messaging_product": "whatsapp",
//   "recipient_type": "individual",
//   "to": "971565546190",
//   "type": "text",
//   "text": {
//       "preview_url": false,
//       "body": "This is Test Message only"
//   }
// });

//This Request with The Preview.

// let data = JSON.stringify({
//   "messaging_product": "whatsapp",
//   "to": "971565546190",
//   "text": {
//       "preview_url": true,
//       "body": "Please visit https://youtu.be/hpltvTEiRrY to inspire your day!"
//   }
// });


//

let data = JSON.stringify({
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "971565546190",
  "type": "image",
  "image": {
      "link": "https://meetingmindsexperts.com/wp-content/uploads/2018/11/MME-WEB-LOGO-12-11-18.png"
  }
});



    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://graph.facebook.com/v16.0/126938783721317/messages',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+process.env.WP_ACCESS_TOKEN,
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  }

module.exports = {
  createItem,
  getItemById,
  queryItems,
  getItemByEventId,
  searchQuery,
  GetRegistratedMobileNumbers,
  SendSMS,
  sendWhatsappMessage,
  getTextMessageInput
};
