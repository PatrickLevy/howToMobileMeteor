Meteor.startup(function() {  
  GoogleMaps.load();
});

var randPhoto;
var latitude;
var longitude;
Template.viewPictures.helpers( {
	'photo': function () {
		//Set current photo to be displayed
		var numPhotos = Photos.find({}).count();
		var randPhotoIndex = _.random(0, numPhotos - 1);
		randPhoto = 'photo' + randPhotoIndex;
		Session.set('currentPhoto', localStorage.getItem(randPhoto));

		//Get geolocation of current photo for google map
		var curPhoto = Photos.find({"photoName": randPhoto}).fetch();
		latitude = curPhoto[0].photolocation.latitude;
		longitude = curPhoto[0].photolocation.longitude;
		Session.set("latitude", latitude);
		Session.set("longitude", longitude);
		
		return Session.get('currentPhoto');
	},	
});

Template.viewPictures.events( {
	'click .shake': function () {
		location.reload();	
	}
});

Template.map.helpers({  
  mapOptions: function() {
  	//var curPhoto = Session.get('currentPhoto');
    if (GoogleMaps.loaded()) {

      return {
        center: new google.maps.LatLng(Session.get("latitude"), Session.get("longitude")),
        zoom: 15
      };
    }
  }
});

Template.map.onCreated(function() {  
  GoogleMaps.ready('map', function(map) {

     var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
  	});

  });
});


