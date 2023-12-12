const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { eventsairService,registrationServices,batchesServices } = require('../services');
const axios = require('axios');
const config = require('./../config/config');
const getUniqueListBy = require('../utils/getUniqueListBy');
const getCountryISOCode = require('../utils/getCountryISOCode');



const mailchimp = require('@mailchimp/mailchimp_marketing');
const { response } = require('express');
const md5  = require('md5');
const formatPhoneNumber = require('../utils/formatPhoneNumber');
const { PhoneNumber } = require('google-libphonenumber');

const createEventsair = catchAsync(async (req, res) => {
  const eventsair = await eventsairService.eventsairCreateItem(req.body);
  res.status(httpStatus.CREATED).send(eventsair);
});

const createEventsairList = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  // return res.send(req);
  const result = await eventsairService.queryEventsairItems();
  res.send(result);
});
const getEventsairItem = catchAsync(async (req, res) => {

  const user = await eventsairService.getEventsairById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  res.send(user);
});


const syncToMailChimp = catchAsync(async (req, res) => {
 const id = req.params.id;
 const registrationList = await registrationServices.getItemByEventId(id);
 if (!registrationList) {
  throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
}

const eventDetails = await eventsairService.getEventsairById(id);

  mailchimp.setConfig({
    apiKey: config.mailchimpKey,
    server: config.mailchimpPrefix
  });



  const listId = "3883903c82"; // Actual

//  const listId = "80a4efb9c1";


async function run() {

// const users = [
//  {
//   id:164,
//   first_name:'muhammad',
//   last_name:'waqas',
//   email:'dev.waqase122@gmail.com',
//   title:'dr.',
//   position:'doctor',
//   organization:'abc',
//   registration_type:'early bird',
//   country:'united arab emirates',
//   tags: [{
//     id:2,
//     title:'test',
//   },{
//     id:3,
//     title:'testasd',
//   },{
//     id:5,
//     title:'tes atasd',
//   }
// ]
//  },
//  {
//   id:264,
//   first_name:'muhammad',
//   last_name:'waqas',
//   email:'acsa015easdb@asdfdc.com',
//   title:'dr.',
//   position:'doctor',
//   organization:'abc',
//   registration_type:'early bird',
//   country:'united arab emirates',
//   tags: [{
//     id:2,
//     title:'test',
//   },{
//     id:3,
//     title:'testasd',
//   },{
//     id:5,
//     title:'tes atasd',
//   }
// ]
//  }
// ];


let users = await registrationServices.getItemByEventId(id);

users = getUniqueListBy(users,'email');

  const operations = users.map((user, i) => ({
    method: "PUT",
    path: `/lists/${listId}/members/${md5(user.email)}`,
    operation_id: i+"158",
    body: JSON.stringify({
      email_address: user.email,
      status_if_new:'subscribed',
      status: "subscribed",
      merge_fields: {
        FNAME: user.first_name,
        LNAME: user.last_name,
        PREFIX: user.title,
        JOBTITLE:user.position,
        // PARTICIPAT:user.registration_type,
        ORG:user.organization,
        COUNTRYADD:user.country,
    },
    tags: user.tags.map((v)=> {
      if(v.title){
        return v.title
      }
    })
    })
  }));


  const response = await mailchimp.batches.start({
    operations
  });

  batchesServices.createItem({
     title:eventDetails.title,
     batch_id: response.id,
     event_id:id,
     status:response.status,
     total_operations:response.total_operations,
     finished_operations:response.finished_operations,
     errored_operations:response.errored_operations
  });
  return res.send({count:users.length,type:'success','op':operations });
}
run();
  return true;
});



// const getBatchStatus = catchAsync(async (req, res) => {
//   const id = req.params.id;
//   const registrationList = await registrationServices.getItemByEventId(id);
//   if (!registrationList) {
//    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
//  }


//    mailchimp.setConfig({
//      apiKey: config.mailchimpKey,
//      server: config.mailchimpPrefix
//    });



//    const listId = "80a4efb9c1";


//  async function run() {

//    const operations = registrationList.map((user, i) => ({
//      method: "POST",
//      path: `/lists/${listId}/members}`,
//      operation_id: user.id,
//      body: JSON.stringify({
//        email_address: user.email,
//        status: "subscribed",
//        merge_fields: {
//          FNAME: user.first_name,
//          LNAME: user.last_name,
//          PREFIX: user.title,
//          ROLE:user.position,
//          PARTICIPAT:user.registration_type,
//          ORG:user.organization,
//          COUNTRYADD:user.country,
//      },
//      tags: user.tags.map((v)=> {
//         return v.title
//      })
//      })
//    }));


//    // const response = await mailchimp.batches.start({
//    //   operations
//    // });
//    response = {"id":"sqge4cgzfk","status":"pending","total_operations":0,"finished_operations":0,"errored_operations":0,"submitted_at":"2023-04-09T13:06:39+00:00","completed_at":"","response_body_url":"","_links":[{"rel":"parent","href":"https://us10.api.mailchimp.com/3.0/batches","method":"GET","targetSchema":"https://us10.api.mailchimp.com/schema/3.0/Definitions/Batches/CollectionResponse.json","schema":"https://us10.api.mailchimp.com/schema/3.0/Paths/Batches/Collection.json"},{"rel":"self","href":"https://us10.api.mailchimp.com/3.0/batches/sqge4cgzfk","method":"GET","targetSchema":"https://us10.api.mailchimp.com/schema/3.0/Definitions/Batches/Response.json"},{"rel":"delete","href":"https://us10.api.mailchimp.com/3.0/batches/sqge4cgzfk","method":"DELETE"}]};
//    console.log(response);
//    return res.send(response);
//  }
//  run();


//    return true;
//  });



const getEventsairUsersList = catchAsync(async (req,res) => {
  const item = await eventsairService.getEventsairById(req.params.id);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  ;


// return formatPhoneNumber('123535','us');
 axios.get(item.url,{ 'headers': {
  'apikey':config.eventsairkey,
  'apppassword': item.password,
  'appusername':item.email,
  'cache-control':'no-cache'
}})
 .then((response) => {
   //receive response
  //  console.info(response);
  if(response.data.Attendees == undefined){
    res.status(httpStatus.OK).json({type:'error','message':'Currently There are no registrations' });
    return;
  }


  //  if(response.data.length < 0){

  //  }
  let resp = getUniqueListBy(response.data.Attendees,'Email');

  resp.forEach(element => {
    let PhoneNum = 0;

    if(element.Email){


      if(element.MobileNumber != null){

      PhoneNum = formatPhoneNumber(element.MobileNumber,getCountryISOCode(element.Country));
      PhoneNum = PhoneNum.replace("+","")
      }



      registrationServices.createItem({
        "title":element.Title,
        "first_name":element.FirstName,
        "last_name":element.LastName,
        "email":element.Email.toLowerCase(),
        "position":element.Position,
        "organization":element.Organization,
        "country":element.Country,
        "registration_type":element.RegistrationType,
        "mobile_number": element.MobileNumber == null ? 0 : PhoneNum,
        "ea_id":element.ID,
        "events":[item.id],
        "tags":item.tags
       },item._id,item.tags);
      }
  });

   res.status(httpStatus.OK).json({count:Object.keys(getUniqueListBy(response.data.Attendees,'Email')).length,type:'success','list':resp });
  // res.status(httpStatus.OK).json({data:resp });
  //  res.send(item);
 })
 .catch((error) => {
  console.log(error);
  if(error.response.status == 403){
    return res.status(httpStatus.OK).json({type:'error','message':'Please check Eventsiar Credentials' });
  } else {
    return res.status(httpStatus.OK).json({type:'error','message':'There is something wrong.' });
  }
  // console.log('error');

 });
//


});


const updateEventsairItem = catchAsync(async (req, res) => {
  const user = await eventsairService.updateEventsairById(req.params.id, req.body);
  res.send(user);
});

const deleteEventsairItem = catchAsync(async (req, res) => {
  await eventsairService.deleteEventsairById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send({"message":"Item Deleted Successfully"});
});

module.exports = {
  createEventsair,
  createEventsairList,
  getEventsairItem,
  updateEventsairItem,
  deleteEventsairItem,
  getEventsairUsersList,
  syncToMailChimp
};
