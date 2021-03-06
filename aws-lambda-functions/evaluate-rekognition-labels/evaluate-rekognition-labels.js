exports.handler = (event, context, callback) => {
    
    //
    // Evaluates labels from Rekognition and decides whether or not an emergency situation has been detected.
    //
    
    try {
    
        var labels = event.Labels;
        var key = 'Name';
      
        // List should be extended with all "trigger" labels from Rekognition
        for (key in labels) {
          if (labels.hasOwnProperty(key)) {
            if (labels[key].Name.indexOf('Human') > -1) callback(null, Object.assign({"Alert": "true"}, event));
            if (labels[key].Name.indexOf('People') > -1) callback(null, Object.assign({"Alert": "true"}, event));
            if (labels[key].Name.indexOf('Person') > -1) callback(null, Object.assign({"Alert": "true"}, event));
            if (labels[key].Name.indexOf('Male') > -1) callback(null, Object.assign({"Alert": "true"}, event));
            if (labels[key].Name.indexOf('Female') > -1) callback(null, Object.assign({"Alert": "true"}, event));
          }
        }
    
    }catch(err){
        
        // Log errors
        var errorMessage =  'Error in [evaluate-rekognition-labels].\r' + 
                                '   Function input ['+JSON.stringify(event, null, 2)+'].\r' +  
                                '   Error ['+err+'].';
        log.console(errorMessage);
        callback(errorMessage, null); // Convert to error string
    }
        
    // If we get this far then no 'alert' label was found        
    callback(null, Object.assign({"Alert": "false"}, event));
};
