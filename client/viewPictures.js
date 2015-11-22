Meteor.startup(function() {  
  GoogleMaps.load();
});

var randPhoto;
var latitude = 44.9778;
var longitude = -93.2650;

Template.viewPictures.helpers( {
	'photo': function () {
		var numPhotos = Photos.find({}).count();
		var randPhotoIndex = _.random(0, numPhotos - 1);
		randPhoto = 'photo' + randPhotoIndex;
		Session.set('currentPhoto', localStorage.getItem(randPhoto));

		var curPhoto = Photos.find({"photoName": randPhoto}).fetch();
		console.log("curPhoto", curPhoto);
		console.log("curPhoto[0].photolocation", curPhoto[0].photolocation);
		latitude = curPhoto[0].photolocation.latitude;
		longitude = curPhoto[0].photolocation.longitude;
		Session.set("latitude", latitude);
		Session.set("longitude", longitude);
		

		return Session.get('currentPhoto');
	},

	
});

Template.viewPictures.events( {
	'click .shake': function () {
		// var numPhotos = Photos.find({}).count();
		// var randPhotoIndex = _.random(0, numPhotos - 1);
		// randPhoto = 'photo' + randPhotoIndex;
		// //Session.set('currentPhoto', Session.get(randPhoto));
		// var curPhoto = Photos.find({"photoName": randPhoto}).fetch();
		// latitude = curPhoto[0].photolocation.latitude;
		// longitude = curPhoto[0].photolocation.longitude;
		// Session.set("latitude", latitude);
		// Session.set("longitude", longitude);
		
		// Session.set('currentPhoto', localStorage.getItem(randPhoto));
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
	     console.log("I'm ready!");

	     var marker = new google.maps.Marker({
	      position: map.options.center,
	      map: map.instance

	  	});

	  });
	});



// Tracker.autorun(function () {
//   var curPhoto = Session.get('currentPhoto');
//   console.log('Autorun is auto-running!');
//   console.log(count);
// });
