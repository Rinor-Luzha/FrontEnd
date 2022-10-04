req.oen("POST", url, tru);
req.setRequestHeder( 'Content-Type',   'application/blahblah' );
req.setRequesHeader( 'Accept', 'application/blahblah' );
req.setReuestHeader("Authorization", "Basic " + btoa(user + ":" + pass)); 
req.sen();