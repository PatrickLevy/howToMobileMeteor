

Template.takePhoto.events({
    'click .capture': function(){
        //console.log("Button clicked.");
		    
		navigator.geolocation.getCurrentPosition(function(position) {
  			console.log(position.coords.latitude, position.coords.longitude);
		
  			MeteorCamera.getPicture({width: 300, height: 300}, function(error, data){
		  		if(error){
		  			console.log("error taking photo");
		  		}
		  		else {
		  			var photosCount = Photos.find({}).count();
		  			console.log('photosCount', photosCount);
		  			var photoName = "photo" + (photosCount);
		  			
		  			
		  			//Session.set(photoName, data);

		  			localStorage.setItem(photoName, data);

		  			// var location = Geolocation.latLng()
		  			// console.log("location" , location.lat);

		  			Photos.insert({photoName: photoName, photoNumber: photosCount, photolocation: {latitude: position.coords.latitude, longitude: position.coords.longitude}});

		  			

		  			

		  			// Images.insert(data, function (err, fileObj) {
	      //     			if (err){
	      //        		// handle error
	      //        		console.log("error inserting photo");
	      //     			} else {
	      //        		// handle success depending what you need to do
	 
	      //       		// var imagesURL = {
	      //         // 			“image”: “/cfs/files/images/“ + fileObj._id
	      //       		// };
	      //       		// Meteor.users.update(userId, {$set: imagesURL});
	          			
	      //       		console.log("image inserted");
	      //     			}
	      //   		});
				}
			});




		});
		    

    }
  });