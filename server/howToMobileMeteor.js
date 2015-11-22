//Write server code here
Photos = new Mongo.Collection("photos");

Meteor.publish("photos", function () {
    return Photos.find();
  });


var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
 stores: [imageStore]
});

Meteor.publish("images", function(){ return Images.find(); });

///////////////////////////////////////////
Images.deny({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 },
 download: function(){
 return false;
 }
 });

Images.allow({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 },
 download: function(){
 return true;
 }
});

///////////////////////////////////////////


//Write code for mobile here
if (Meteor.isCordova) {
  
}


Meteor.startup(function () {
    //Photos.remove({});
});


