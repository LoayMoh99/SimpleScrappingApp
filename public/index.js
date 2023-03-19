const socket = io();

socket.on("outputchanged", function (outputData) {
    //to show the data
    if(Object.keys(outputData).length === 0)
    document.querySelector("#listener").innerHTML = 'كله تمام يا ريس!!';
    else
    // TODO: check if we can add notifications!!
    document.querySelector("#listener").innerHTML = JSON.stringify(outputData);
});
  

